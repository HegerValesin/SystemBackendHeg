# Logística Backend — Monólito Modular

Uma API NestJS única para autenticação, cadastros, operações e documentos. O processo HTTP escuta a porta `3000`; o transporte TCP `3001` é interno à própria aplicação e existe apenas para compatibilidade entre módulos durante a transição.

## Executar

```powershell
Copy-Item .env.monolith.example .env
docker compose up --build
```

Use `DB_SYNCHRONIZE=true` somente para criar um banco local vazio. Em produção, mantenha `false`, execute migrations antes do deploy e migre os dados dos bancos antigos para `logistica_db` antes de desligá-los.

## Autorização

Exceto pelos endpoints de autenticação indicados abaixo, as rotas usam `Authorization: Bearer <accessToken>`. As rotas de cadastros e usuários exigem os papéis `ADMIN` ou `OPERATOR`; as rotas móveis exigem `DRIVER` e conferem se o `motoristaId` do token é o mesmo da URL.

O login usa CPF e senha. Envie `{ "cpf": "123.456.789-09", "senha": "..." }` para `POST /auth/login`. A senha deve ser enviada em texto somente sobre HTTPS; o servidor a transforma com bcrypt antes de persistir e nunca aceita hash gerado pelo front como senha armazenada. O HTTPS protege CPF e senha em trânsito; criptografia no front não substitui TLS e geraria um segredo reutilizável.

Após a primeira migração, CPFs de usuários vinculados a motoristas são preenchidos automaticamente. Para os demais usuários legados, cadastre o CPF pelo ID do usuário antes de trocar o login no front: `npm run set:user-cpf -- <userId> <cpf>`.

## Rotas HTTP

| Método | Rota | Processo |
|---|---|---|
| POST | `/auth/register` | Cria usuário e grava auditoria. |
| POST | `/auth/login` | Valida credenciais, lista transportadoras vinculadas e retorna access/refresh token. |
| POST | `/auth/refresh` | Autenticado; troca o refresh token por novo access token. |
| POST | `/auth/logout` | Invalida o refresh token do usuário. |
| POST | `/auth/me` | Retorna o usuário autenticado. |
| GET/POST/PUT/DELETE | `/clientes`, `/clientes/:id` | CRUD de clientes por transportadora. |
| GET | `/clientes/cnpj-cpf/:cnpjCpf` | Consulta cliente por CNPJ/CPF dentro da transportadora informada. |
| GET | `/clientes/cnpj-cpfOff/:cnpjCpf` | Consulta administrativa por CNPJ/CPF. |
| DELETE | `/clientes/:id/hard` | Exclusão definitiva de cliente. |
| GET/POST/PUT/DELETE | `/transportadoras`, `/transportadoras/:id` | CRUD de transportadoras. |
| GET | `/transportadoras/id/:id`, `/transportadoras/cnpj/:cnpj` | Consulta por ID ou CNPJ. |
| DELETE | `/transportadoras/:id/hard` | Exclusão definitiva de transportadora. |
| GET/POST/PUT/DELETE | `/motoristas`, `/motoristas/:id` | CRUD de motoristas. |
| GET | `/motoristas/cpf/:cpf` | Consulta motorista por CPF. |
| POST | `/motoristas/:id/vincular` | Vincula veículo ao motorista. |
| DELETE | `/motoristas/vinculo/:vinculoId` | Remove vínculo motorista-veículo. |
| GET/POST/PUT/DELETE | `/veiculos`, `/veiculos/:id` | CRUD de veículos por transportadora. |
| GET/POST/PUT/DELETE | `/users`, `/users/:id` | CRUD de usuários. |
| POST | `/users/linked/motorista` | Cria motorista e usuário `DRIVER`; desfaz o motorista se a criação do usuário falhar. |
| POST | `/users/add-carrier` | Vincula usuário a uma transportadora. |
| DELETE | `/users/remove-carrier` | Remove vínculo usuário-transportadora. |
| GET | `/dashboard` | Indicadores de operações, motoristas, veículos, CT-es e atividades recentes. |
| POST | `/operations` | Cria ocorrência, operação e etapas em um único fluxo. |
| POST | `/operations/simple` | Cria somente uma operação. |
| PUT | `/operations/:id` | Atualiza uma operação. |
| POST | `/operations/:id/transition` | Avança o status, valida o ator e registra histórico. |
| GET | `/operations/:id/status-history` | Consulta histórico de status autorizado. |
| POST | `/operations/:id/invoices` | Define notas fiscais da operação. |
| POST | `/operations/steps` | Adiciona etapa à operação. |
| POST | `/operations/occurrences` | Cria ocorrência. |
| GET/POST | `/operations`, `/operations/search` | Pesquisa e filtra operações. |
| POST | `/operations/import/excel` | Importa operações de planilha; multipart com campo `file`. |
| GET | `/mobile/motoristas/:motoristaId/operations` | Lista operações do motorista autenticado. |
| GET | `/mobile/motoristas/:motoristaId/occurrences` | Lista ocorrências do motorista autenticado. |
| POST | `/service-orders` | Cria ordem de serviço. |
| GET | `/service-orders/operation/:operationId` | Lista ordens da operação. |
| POST | `/service-orders/:id/pdf` | Atualiza URL do PDF da ordem. |
| POST | `/operations/documents/service-orders/generate` | Gera PDF de ordem de serviço. |
| POST | `/operations/documents/upload` | Envia documento; multipart com campo `file`. |
| GET | `/operations/documents/download/:documentId` | Baixa documento como anexo. |
| GET | `/operations/documents/view/:documentId` | Exibe documento no navegador. |
| GET | `/operations/documents/by-operation` | Lista documentos por `operationId` e `transportadoraId`. |
| DELETE | `/operations/documents/:documentId` | Exclui documento e seu objeto no MinIO. |
| POST | `/documents/upload` | Alternativa direta autenticada para upload. |
| GET | `/documents/by-operation`, `/documents/:documentId` | Lista por operação ou consulta um documento. |
| GET | `/documents/download/:documentId`, `/documents/view/:documentId` | Baixa ou visualiza documento. |
| DELETE | `/documents/:documentId` | Exclui documento. |

## Processos de negócio

### Autenticação e acesso

1. O login verifica senha, usuário ativo e não excluído.
2. As associações em `carrier_users` determinam as transportadoras presentes no token.
3. Guards validam JWT e papéis nas rotas protegidas.

### Cadastros

Transportadoras agrupam clientes, motoristas e veículos por meio das tabelas de vínculo. Usuários podem estar associados a mais de uma transportadora. O fluxo `users/linked/motorista` cria os dois registros de forma compensável: se o usuário falhar, o motorista criado é removido.

### Operações

Uma operação completa cria uma ocorrência, a operação e suas etapas. Transições verificam o ator, atualizam o estado e gravam `operation_status_history`. Notas, ocorrências, etapas e ordens de serviço são entidades separadas relacionadas à operação.

### Documentos e eventos

Arquivos aceitos são PDF e imagens. O binário é armazenado no MinIO e os metadados no PostgreSQL. Eventos de operação saem pela tabela `outbox_events`, são publicados no RabbitMQ e atualizam projeções de documentos de forma idempotente.

## Banco e infraestrutura

O PostgreSQL único (`logistica_db`) contém todas as entidades dos módulos. MinIO armazena arquivos e RabbitMQ processa eventos assíncronos; ambos são infraestrutura de suporte, não microsserviços de domínio.

### Restaurar os backups legados

Os arquivos em `backups/` são dumps binários do PostgreSQL 17. Para carregar um banco monolítico novo e vazio, execute:

```powershell
.\scripts\restore-monolith-backups.ps1 -DatabaseContainer postgres-auth
```

O script importa cadastros, usuários e operações em modo somente dados. Ele bloqueia reexecuções em banco com dados e ignora o dump separado de documentos, pois neste conjunto seus registros já estão no backup de operações.

Os módulos de domínio permanecem em `auth-service`, `registry-service`, `operations-service` e `documents-service` como limites de código temporários, mas são importados e executados pelo processo único `gateway`.
