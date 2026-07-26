# Análise arquitetural e plano de melhorias

Data da análise: 24 de julho de 2026.

## Estrutura atual

O repositório agora possui cinco microsserviços de domínio e um gateway HTTP. O gateway é a borda pública, portanto não é contado como microsserviço de domínio.

| Componente | Responsabilidade | Porta | Dependências diretas |
| --- | --- | ---: | --- |
| `auth-service` | usuários, autenticação JWT e auditoria | TCP 3001 | PostgreSQL de autenticação; `registry-service` |
| `registry-service` | clientes, transportadoras, motoristas e veículos | TCP 3002 | PostgreSQL de cadastro |
| `operations-service` | operações, etapas, ocorrências e ordens de serviço | TCP 3003 | PostgreSQL de operações; `registry-service`; `documents-service`; MinIO |
| `documents-service` | contrato para documentos | TCP 3004 | PostgreSQL de documentos; clientes TCP para operações e cadastros |
| `gateway` | API HTTP, CORS, validação e proxies para os serviços | HTTP 3000 | auth, registry, operations e documents |

O pacote `shared` contém DTOs e enums reutilizados pelos serviços.

## Remoção realizada

`notifications-service` foi removido por estar comprovadamente órfão: continha apenas o template padrão do Nest (`Hello World`), sem módulos de notificação, persistência ou consumidor TCP. Nenhum controller do gateway ou serviço restante o referencia.

Também foram removidos o PostgreSQL e Redis exclusivos dele, entradas dos três arquivos Compose, workspace/scripts/build e variáveis de ambiente correspondentes. A remoção não altera o fluxo dos cinco componentes restantes.

Foram eliminados documentos históricos, duplicados ou gerados durante a implementação. Permanecem os guias específicos que ainda servem como referência técnica: documentação de API, arquitetura e setup do serviço de documentos, guia de importação/correção de enum das operações, guia de produção Docker e documentação do dashboard.

## Pontos prioritários

1. **Rotacionar segredos imediatamente.** Há senhas de banco, MinIO e credenciais de JWT em arquivos de Compose e de exemplo. Trate os valores atuais como expostos; mova-os para um cofre de segredos/variáveis do ambiente de deploy e mantenha apenas placeholders em exemplos. Inclua `.env`, `.env.*` no `.gitignore`, liberando explicitamente somente `*.example`.
2. **Desativar `synchronize` no TypeORM em produção.** O `documents-service` usa `synchronize: true`; isso pode alterar o schema automaticamente. Use migrations versionadas e uma etapa controlada de migração no deploy em todos os bancos.
3. **Resolver o limite de propriedade entre operações e documentos.** `operations-service` ainda tem módulo/entidade de documento e também chama `documents-service`; esta duplicidade cria duas fontes de verdade. Escolha o `documents-service` como dono de metadados e armazenamento, exponha contratos de consulta/upload, e remova gradualmente o código duplicado de operações.
4. **Substituir TCP síncrono para eventos assíncronos onde houver efeitos colaterais.** Para documentos gerados, importações e futuras notificações, publique eventos versionados em uma fila/broker (RabbitMQ, NATS, SQS etc.) com idempotência, retry e DLQ. Mantenha RPC TCP apenas para consultas/comandos que realmente precisam de resposta imediata.
5. **Implementar testes de integração reais.** Os testes e2e atualmente são em grande parte scaffolding. Cubra autenticação/refresh, isolamento por transportadora, autorização por papel, ciclo de operação, upload/download e falhas dos serviços remotos. Execute-os com PostgreSQL/MinIO efêmeros no CI.

## Melhorias de segurança e confiabilidade

- Validar todas as variáveis de ambiente na inicialização com schema (Joi/Zod/class-validator), falhando cedo quando uma configuração obrigatória estiver ausente.
- Aplicar rate limit, limite de payload e cabeçalhos de segurança no gateway; restringir CORS a origens explícitas por ambiente.
- Propagar identidade e `correlation-id` do gateway nas chamadas internas. Nunca confiar em campos de usuário fornecidos pelo cliente após o gateway.
- Adicionar health/readiness endpoints por serviço e configurar Compose/orquestrador para aguardar *readiness*, não apenas processo iniciado.
- Padronizar tratamento de exceções, timeouts, retry com backoff e circuit breaker nos clientes entre serviços.
- Criar backups, retenção e teste de restauração para cada banco e para o bucket do MinIO.

## Melhorias de engenharia e operação

### Iniciadas em 24/07/2026

- Comandos raiz `build`, `lint`, `test` e `validate`, e workflow de CI para pull requests e `main`.
- Correção do `prebuild` do `auth-service`; agora o pacote `shared` é resolvido por caminho relativo ao workspace.
- Lint sem correção automática, para que a validação nunca altere arquivos.
- `.gitignore` para ambientes locais e artefatos de build; imagens de produção executadas por usuário não-root, com healthcheck TCP.
- `documents-service` deixa de usar sincronização automática do TypeORM em produção.
- O lint foi mantido como relatório (`npm run quality:report`) até a correção do passivo atual; o CI inicial bloqueia em testes e build.
- O agregador de testes aceita temporariamente workspaces sem testes. Testes que existirem continuam obrigatórios e qualquer falha bloqueia o CI.

### RabbitMQ: primeiro fluxo assíncrono

Foi criado o exchange durável de tópico `logistica.events`. O `operations-service` é o único publicador inicial e emite `operation.created` e `operation.updated` após persistir a operação. O `documents-service` possui uma fila durável própria (`documents-service.events`) vinculada a esses tópicos e, neste primeiro estágio, apenas valida e registra a entrega.

Não há loop de informação: consumidores não republicam eventos, o `source` deve ser `operations-service`, eventos desconhecidos são descartados e mensagens inválidas recebem `nack` sem requeue. O envelope possui `eventId`, `eventType`, `version`, `source` e `occurredAt`.

A outbox e a deduplicação persistente já foram implementadas. Até existir uma projeção de documentos transacional, os RPCs TCP continuam sendo o caminho para comandos e consultas síncronas; eventos não alteram dados de negócio neste estágio.

- Remover artefatos compilados (`.js`, `.d.ts`, `.js.map`, `.tsbuildinfo`) de `shared/src` e incluí-los no `.gitignore`; o repositório deve versionar TypeScript-fonte e gerar `dist` no build.
- Padronizar imports TypeScript: há mistura de extensões `.js` e sem extensão. Defina `module`/`moduleResolution` comuns e um lint/format único no workspace.
- Centralizar contratos compartilhados em pacote versionado (`shared`) com política de compatibilidade. Evite importar entidades ou detalhes de banco entre serviços.
- Criar um comando único de validação (`lint`, `test`, `build`) no root e pipeline CI que execute em pull requests, incluindo `docker compose config`.
- Corrigir o `prebuild` do `auth-service`: ele chama `npm --workspace shared run build` de dentro do próprio workspace e falha porque o npm não localiza o workspace raiz. Execute o build compartilhado pelo script raiz ou troque a chamada por um caminho relativo seguro.
- Produzir imagens por serviço com `npm ci`, usuário não-root, healthcheck e tags imutáveis; não use `npm install` a cada inicialização de container de desenvolvimento.
- Instrumentar logs estruturados, métricas (latência, erros, filas) e tracing distribuído com OpenTelemetry. Configure alertas sobre indisponibilidade e falha de jobs.

### Outbox e deduplicação persistente — concluídas em 24/07/2026

- `operations-service` grava a operação e o registro de `outbox_events` na mesma transação. O worker consulta eventos não publicados, publica no RabbitMQ com confirmação e só então preenche `published_at`.
- `documents-service` registra o `eventId` na tabela `processed_events` antes do `ack`. Violação de unicidade é redelivery e é confirmada sem repetir o efeito.
- A entrega é **pelo menos uma vez**: se o processo falhar após a confirmação do broker e antes de atualizar a outbox, haverá nova entrega, mas a deduplicação persistente impede efeito duplicado.
- O fluxo é unidirecional: `operations-service` → `logistica.events` → `documents-service.events`. O consumidor não publica eventos; portanto, não existe ciclo de retorno.

Migrations obrigatórias no deploy:

1. `npm --workspace operations-service run migration:run` para criar `outbox_events`.
2. Aplicar `documents-service/migrations/002_create_processed_events.sql` no banco `documents_db` antes de subir o consumidor.

### Estado de aplicação das migrations — verificado em 25/07/2026

Nenhuma migration foi aplicada por esta automação. No banco configurado pelo `operations-service`, o TypeORM informou como pendentes as quatro migrations disponíveis, incluindo três anteriores à outbox. Por segurança, `migration:run` não foi executado: bancos iniciados anteriormente por `synchronize` podem já ter as alterações de schema, e reaplicar a cadeia inteira poderia falhar ou conflitar.

O script TypeORM do `operations-service` foi corrigido para carregar o `tsconfig` e os aliases do workspace. Antes de aplicar migrations, faça uma revisão/baseline do schema de operações com a credencial atual do banco. A migration SQL de documentos também permanece pendente; a credencial do arquivo global de serviços foi rejeitada pelo PostgreSQL remoto.

### Validação de backups — 25/07/2026

Os quatro arquivos da pasta `backups/` foram identificados como archives PostgreSQL no formato custom (`PGDMP`), apesar da extensão `.sql`. Eles devem ser tratados com `pg_restore`.

Todos foram restaurados com sucesso em um PostgreSQL temporário e isolado: `auth_db`, `registry_db`, `operations_db` e `documents_db`. A validação confirmou a criação de schemas, tabelas, tipos, índices e dados sem tocar nos bancos reais.

### Recriação local e padronização de migrations — concluídas em 25/07/2026

Os quatro bancos consolidados no PostgreSQL local (`localhost:5432`) foram recriados exclusivamente a partir dos backups validados. RabbitMQ, MinIO e demais dados não foram alterados.

- `auth-service`, `registry-service`, `operations-service` e `documents-service` agora possuem datasource e comandos TypeORM de migration.
- `synchronize` foi desativado nos quatro serviços; schema passa a ser controlado por migrations.
- Os schemas restaurados foram registrados como baselines. As três migrations históricas de operações foram registradas sem reaplicação, pois já estão contidas no backup.
- `CreateOutboxEvents` foi executada e criou `operations_db.outbox_events`.
- `CreateProcessedEvents` foi executada e criou `documents_db.processed_events`.
- As migrations SQL legadas de documentos foram substituídas por migrations TypeORM.

Para criar um ambiente novo, restaure primeiro os archives de `backups/` com `pg_restore` e então execute `npm --workspace <serviço> run migration:run`. O script `operations-service/scripts/register-restored-baseline.sql` registra o baseline histórico de operações antes da sua migration incremental.

### Teste de integração da outbox — aprovado em 25/07/2026

Com `operations-service`, `documents-service` e RabbitMQ em execução local, foi inserido um evento controlado na outbox. O worker o publicou, preencheu `published_at` e registrou uma tentativa. Ao reabrir o mesmo evento para um segundo envio, a outbox registrou duas tentativas, enquanto `documents_db.processed_events` permaneceu com somente um registro para o mesmo `eventId`.

O teste confirma publicação assíncrona e deduplicação persistente. Os registros e processos temporários foram removidos ao final. O próximo teste funcional deve criar e atualizar uma operação real via API, com fixtures de cadastro válidas.

### Teste automatizado do fluxo real de operações — concluído em 25/07/2026

Foi incluído `operations-service/test/outbox-flow.e2e-spec.ts`. Ele usa o endpoint TCP real para criar e editar uma operação e verifica, nos bancos, a criação da outbox, a publicação, o consumo pelo `documents-service` e a deduplicação após uma republicação controlada. O teste é opt-in para não tocar em bancos sem autorização: requer `RUN_OUTBOX_INTEGRATION=true`, `OPERATIONS_TEST_DATABASE_URL` e `DOCUMENTS_TEST_DATABASE_URL`, além dos serviços e RabbitMQ em execução. Execute-o com `npm run test:outbox-integration --workspace=operations-service`.

O teste foi executado com êxito no ambiente local em 25/07/2026. Os dados temporários — operação, ocorrência, snapshots, eventos de outbox e registros processados — são removidos automaticamente ao término. O `documents-service` também foi corrigido para manter `synchronize: false` em todos os ambientes, usando somente migrations para mudanças de schema.

### Configuração local do RabbitMQ — corrigida em 25/07/2026

O broker local foi criado com o usuário `logistica`, portanto os serviços locais devem definir `RABBITMQ_URL` com essa credencial. O fallback legado `guest:guest` foi substituído pelo padrão local do `docker-compose`. Em produção, a variável deve sempre ser configurada com uma senha forte e exclusiva, sem depender desse fallback.

Próxima evolução: DLQ, retry com backoff por evento, lock distribuído para múltiplas réplicas do worker e projeção de documentos gravada na mesma transação do registro em `processed_events`.

### DLQ e retry controlado do Documents — concluídos em 26/07/2026

O `documents-service` agora declara uma fila de retry (`documents-service.events.retry`) com atraso configurável e uma DLQ durável (`documents-service.events.dlq`). Uma falha de processamento é reenviada ao fluxo principal com o cabeçalho `x-retry-count`; após `RABBITMQ_MAX_RETRIES` (padrão: 3), ou quando o evento é inválido, ele é publicado na DLQ e confirmado na fila original. Assim, não há loop infinito nem descarte silencioso.

As variáveis `RABBITMQ_MAX_RETRIES` e `RABBITMQ_RETRY_DELAY_MS` estão documentadas e configuradas nos dois Docker Compose. O log registra cada retry e a transferência para a DLQ; a fila pode ser inspecionada no painel do RabbitMQ. Testes unitários cobrem retry, limite de tentativas e evento inválido.

### Reprocessamento seguro da DLQ — concluído em 26/07/2026

O comando `npm run dlq:requeue --workspace=documents-service` reenvia mensagens da fila `documents-service.events.dlq` para o exchange original. Ele só executa quando `CONFIRM_REQUEUE_DLQ=true` estiver definido, processa no máximo 10 mensagens por padrão (ou `--limit=1..100`), valida o contrato `operations-service` v1 e só confirma a remoção da DLQ após a confirmação do broker. Os cabeçalhos de retry são limpos para que a mensagem receba um novo ciclo de tentativas.

Exemplo no PowerShell: `$env:CONFIRM_REQUEUE_DLQ='true'; npm run dlq:requeue --workspace=documents-service -- --limit=10`. Antes de executá-lo, analise a causa da falha no painel do RabbitMQ; eventos já processados são seguros, pois o consumidor mantém deduplicação por `eventId`.

### Operação resiliente e CI de integração — concluídos em 26/07/2026

- O monitor do `documents-service` consulta as filas de retry e DLQ periodicamente. Ao atingir `RABBITMQ_DLQ_ALERT_THRESHOLD` (padrão: 1), emite um alerta estruturado no log. O intervalo é configurável por `RABBITMQ_MONITOR_INTERVAL_MS`.
- Eventos válidos agora atualizam `operation_projections` na mesma transação que grava `processed_events`. A projeção mantém número, status, ocorrência e o último evento recebido; mensagens antigas não sobrescrevem estados mais recentes.
- A outbox recebeu `locked_at` e `lock_owner`. Instâncias do Operations usam `FOR UPDATE SKIP LOCKED`, e somente a instância que obteve o lock pode finalizar a publicação. Locks expirados são recuperados após `OUTBOX_LOCK_TIMEOUT_MS`.
- O CI passou a subir PostgreSQL e RabbitMQ efêmeros, aplicar migrations do Documents e validar o consumo real de um evento e sua projeção.
- `.env.services.example` não contém mais credenciais ou endereços reais. Em produção, injete as variáveis por secrets do provedor/CI ou um gerenciador de segredos; não versione arquivos `.env` reais.

As migrations `CreateOperationProjections1760000000000` e `AddOutboxLock1760000000000` foram aplicadas e verificadas no PostgreSQL local em 26/07/2026.

### Pendências prioritárias originais — andamento em 26/07/2026

- O código duplicado de documentos foi removido do `operations-service`; o Gateway passou a encaminhar upload, consulta, download e exclusão diretamente ao `documents-service`. A tabela legada não foi apagada para preservar dados até uma migração de transferência validada.

Em 26/07/2026, a implementação e os handlers TCP de documentos foram efetivamente instalados no `documents-service` e uma migration de criação da tabela `documents` foi adicionada. Isso elimina a dependência do Operations para essas rotas.

Após a transferência, a configuração de MinIO também passou a pertencer ao `documents-service` nos ambientes local e Docker. Uploads não dependem mais das variáveis do Operations.
- Foi incluído teste automatizado do `RolesGuard`, além dos testes de eventos já existentes. O CI continua cobrindo o fluxo RabbitMQ/PostgreSQL. Casos e2e de autenticação, autorização por transportadora e MinIO ainda exigem um ambiente de testes dedicado com fixtures de negócio.
- Os arquivos de exemplo de ambiente não contêm segredos reais e a configuração de produção exige senhas injetadas externamente. O guia de produção deve ser seguido para migrations, DLQ e healthchecks.

## Roteiro sugerido

**Semana 1:** rotacionar segredos, corrigir `.gitignore`, validação de ambiente, desligar `synchronize` em produção e introduzir health checks.

**Semanas 2–3:** migrations completas, testes e2e essenciais no CI e timeouts/retries padronizados.

**Semanas 4–5:** consolidar a propriedade de documentos e publicar o primeiro evento assíncrono com idempotência.

**Depois:** observabilidade completa, políticas de backup/restauração e, se notificações voltarem a ser uma necessidade, criar um novo `notifications-service` somente após definir eventos, canais (e-mail/push/WhatsApp), persistência, retries e métricas.
