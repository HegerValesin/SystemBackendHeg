# Ajustes do Fluxo Operacional

Documento vivo para acompanhar a implantação dos fluxos de Coleta, Entrega e Transferência. Cada etapa concluída deve ser registrada aqui com data, decisão tomada e pendências remanescentes.

## Objetivo

Impedir saltos de etapa, exigir evidências quando necessárias, manter histórico auditável e restringir o cancelamento a administradores vinculados à transportadora da operação.

## Etapa 1 — Máquina de estados e auditoria

**Situação:** Implementada e migrada no ambiente local.

### Entregas realizadas

- Criada a rota `POST /operations/:id/transition` para avançar o fluxo de uma operação.
- A rota genérica `PUT /operations/:id` não aceita mais alteração direta de status.
- Criada a tabela `operation_status_history` para registrar:
  - status anterior e status novo;
  - data/hora efetiva da ação;
  - usuário e perfil que realizou a ação;
  - observação ou motivo informado.
- Criada a consulta `GET /operations/:id/status-history`.
- Somente usuários vinculados à transportadora da operação podem executar transições.
- O cancelamento exige perfil `ADMIN` ou `SUPER_ADMIN`, vínculo com a transportadora e motivo obrigatório.
- Operações finalizadas não podem ser canceladas.
- Adicionada compatibilidade para operações antigas que já estejam em andamento.

### Novos status

| Código | Uso |
|---|---|
| `Created` | Operação criada. |
| `Collecting_Container` | Coleta: motorista e veículo definidos, aguardando dados do contêiner. |
| `Picking_Up_Container` | Entrega: retirada do contêiner foi programada. |
| `In_Transit_To_Client` | Coleta: contêiner informado e veículo em rota para o cliente. |
| `In_Transit` | Entrega/transferência: veículo em deslocamento. |
| `At_Client` | Veículo chegou ao cliente. |
| `Loading` | Carregamento em andamento. |
| `Loaded` | Carregamento concluído. |
| `Unloading` | Descarga em andamento. |
| `Unloaded` | Descarga concluída. |
| `Port_Scheduled` | Transferência: retirada no porto agendada e prancha alocada. |
| `Port_Delivery` | Coleta: CT-e, MDF-e e agendamento do porto informados. |
| `Finished` | Operação finalizada. |
| `Cancelled` | Operação cancelada por administrador autorizado. |

## Regras por fluxo

### Coleta

`Created → Collecting_Container → In_Transit_To_Client → At_Client → Loading → Loaded → Port_Delivery → Finished`

1. Para avançar a `In_Transit_To_Client`, são obrigatórios os anexos `CONTAINER_PHOTO` e `PICKUP_TICKET`.
2. A chegada ao cliente (`At_Client`) registra data/hora; **não exige foto**.
3. Para avançar a `Loaded`, é necessário informar número de NF ou anexar documento do tipo `INVOICE`.
4. Para avançar a `Port_Delivery`, são obrigatórios número do CT-e, número do MDF-e e agendamento do porto.
5. Para finalizar, é obrigatório anexar `DELIVERY_TICKET`.

### Entrega

`Created → Picking_Up_Container → In_Transit → At_Client → Unloading → Unloaded → Finished`

1. Para avançar a `Picking_Up_Container`, são obrigatórios número do CT-e, número do MDF-e, agendamento de retirada e documento `INVOICE`.
2. Para avançar a `Unloaded`, são obrigatórios `SIGNED_RECEIPT` e `CTE`.
3. Para finalizar, é obrigatório anexar `DELIVERY_TICKET`.

### Transferência

`Created → Port_Scheduled → Finished`

Fluxo Porto → Empresa responsável:

1. A operação é criada já com os dados principais, dados do contêiner e veículo/prancha definidos.
2. No agendamento do porto, informar `scheduledAt` e `transferTripCode` (código da viagem). O status passa para `Port_Scheduled`.
3. A confirmação de entrega na empresa exige o anexo `DELIVERY_TICKET`; então o status passa para `Finished`.

#### Regra de capacidade da prancha

- Uma viagem de transferência (`transferTripCode`) pode ter um contêiner de 40 **ou** até dois contêineres de 20.
- Para compartilhar a prancha com dois contêineres de 20, as duas operações devem ter a mesma placa de carreta e o mesmo `transferTripCode`.
- A mesma prancha pode ser previamente atribuída a várias transferências no dia. Cada viagem deve usar um código próprio; por isso uma nova viagem não bloqueia outra já agendada.

## Documentos tipados

O upload aceita o campo opcional `documentType`. Tipos disponíveis:

- `CONTAINER_PHOTO`
- `PICKUP_TICKET`
- `INVOICE`
- `CTE`
- `MDFE`
- `SIGNED_RECEIPT`
- `DELIVERY_TICKET`
- `DELIVERY_RECEIPT`

Exemplo:

```http
POST /operations/documents/upload
Content-Type: multipart/form-data

file: foto-container.jpg
operationId: <uuid>
transportadoraId: <uuid>
documentType: CONTAINER_PHOTO
```

## Integração da API

Para avançar uma operação, o frontend deve usar `POST /operations/:id/transition`; o `PUT /operations/:id` não altera mais status.

O corpo da transição aceita `toStatus`, `occurredAt`, `notes`, `cteNumber`, `mdfeNumber`, `scheduledAt` e `transferTripCode`.

```json
{
  "toStatus": "Port_Scheduled",
  "scheduledAt": "2026-07-26T08:00:00-03:00",
  "transferTripCode": "VIAGEM-PORTO-001"
}
```

O histórico pode ser consultado em `GET /operations/:id/status-history`.

## Ativação no banco de dados

Antes de liberar os fluxos, executar as migrações:

```powershell
npm run migration:run --workspace=documents-service
npm run migration:run --workspace=operations-service
```

**Executado em 26/07/2026 no ambiente local:** migrações de Documents e Operations aplicadas com sucesso.

## Próximas etapas

- [x] Executar as migrações no ambiente local.
- [ ] Executar as migrações em homologação e validar o fluxo completo.
- [ ] Adaptar o frontend para exibir apenas a próxima ação permitida e obrigar o envio dos anexos necessários.
- [ ] Criar telas de histórico de status e visualização dos comprovantes por operação.
- [x] Definir e implementar o fluxo Porto → Empresa da Transferência.
- [ ] Definir o fluxo Empresa responsável → Porto da Transferência.
- [ ] Ampliar os testes automatizados para cada transição válida e todos os documentos obrigatórios.
- [x] Criar testes iniciais para salto de etapa, falta de documento, cancelamento sem autorização e capacidade da prancha.
- [ ] Atualizar a coleção Postman.
- [x] Atualizar a documentação da API.

## Registro de alterações

| Data | Etapa | Situação | Observação |
|---|---|---|---|
| 26/07/2026 | Máquina de estados, auditoria, permissões e documentos tipados | Concluído no ambiente local | Migrações aplicadas. |
| 26/07/2026 | Transferência Porto → Empresa e capacidade da prancha | Concluído no ambiente local | Migração adicional aplicada. |
| 26/07/2026 | Testes iniciais do fluxo operacional | Concluído | Quatro regras críticas cobertas no Operations Service. |
| 26/07/2026 | Documentação da API de transições | Concluído | Documento de fluxo atualizado. |
