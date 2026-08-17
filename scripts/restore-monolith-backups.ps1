param(
  # Nome do container que executa o PostgreSQL que contém logistica_db.
  [string]$DatabaseContainer = 'postgres-auth'
)

$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$envPath = Join-Path $projectRoot '.env'
$backupPath = Join-Path $projectRoot 'backups'

if (-not (Test-Path -LiteralPath $envPath)) {
  throw 'Arquivo .env não encontrado na raiz do projeto.'
}

$settings = @{}
Get-Content -LiteralPath $envPath | ForEach-Object {
  if ($_ -match '^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$') {
    $settings[$matches[1]] = $matches[2]
  }
}

foreach ($key in 'DB_PASSWORD', 'DB_DATABASE') {
  if ([string]::IsNullOrWhiteSpace($settings[$key])) {
    throw "$key não está configurada no .env."
  }
}

$env:PGPASSWORD = $settings['DB_PASSWORD']
$dbUser = if ($settings['DB_USERNAME']) { $settings['DB_USERNAME'] } else { 'postgres' }
$dbName = $settings['DB_DATABASE']

# Este script é propositalmente bloqueado se o destino já tiver dados: ele é
# destinado ao primeiro carregamento, evitando duplicações em reexecuções.
$rowCount = & docker run --rm --network "container:$DatabaseContainer" -e PGPASSWORD -e "PGUSER=$dbUser" -e "PGDATABASE=$dbName" postgres:17 sh -c 'psql --host 127.0.0.1 --tuples-only --no-align --command "SELECT COALESCE(sum(n_live_tup), 0) FROM pg_stat_user_tables;"'
if ($LASTEXITCODE -ne 0) {
  throw 'Não foi possível conectar ao PostgreSQL de destino.'
}
if ([long]($rowCount | Select-Object -Last 1) -gt 0) {
  throw 'O banco de destino já contém dados. A restauração foi bloqueada para evitar duplicações.'
}

$backups = @(
  'dump-registry_db-202607241913.sql',
  'dump-auth_db-202607251548.sql',
  'dump-operations_db-202607241912.sql'
)

foreach ($backup in $backups) {
  $filePath = Join-Path $backupPath $backup
  if (-not (Test-Path -LiteralPath $filePath)) {
    throw "Backup não encontrado: $filePath"
  }

  Write-Host "Importando $backup..."
  # Os dumps foram criados com pg_dump 17 e o servidor é PostgreSQL 16. A
  # única instrução incompatível é transaction_timeout; ela é removida do SQL
  # temporário antes do carregamento, que ocorre em uma transação.
  & docker run --rm --network "container:$DatabaseContainer" -e PGPASSWORD -e "PGUSER=$dbUser" -e "PGDATABASE=$dbName" -e "TASK_BACKUP=$backup" -v "${backupPath}:/backups:ro" postgres:17 sh -c 'pg_restore --data-only --no-owner --no-privileges --disable-triggers --file=/tmp/restore.sql /backups/$TASK_BACKUP && sed -i /transaction_timeout/d /tmp/restore.sql && psql --host 127.0.0.1 --set ON_ERROR_STOP=1 --single-transaction --file /tmp/restore.sql'
  if ($LASTEXITCODE -ne 0) {
    throw "Falha ao importar $backup."
  }
}

# O dump de operações já contém os documentos. O dump separado de documentos
# deste conjunto possui apenas IDs já presentes e, por isso, é omitido.
Write-Host 'Importação concluída com sucesso.'
