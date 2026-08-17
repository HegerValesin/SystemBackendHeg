# Processo operacional — coleta e entrega de contêiner

Este documento descreve o fluxo de uma operação de contêiner no monólito, desde o registro da demanda até o encerramento. A operação é vinculada a uma transportadora, motorista, veículos e um retrato do contêiner no momento da criação.

## Papéis envolvidos

| Papel | Responsabilidade principal |
|---|---|
| Operador | Cria e atualiza a operação, cadastra etapas, notas e documentos. |
| Motorista | Consulta apenas as próprias operações e ocorrências no módulo móvel. |
| Administrador | Tem as permissões do operador e pode cancelar uma operação. |

## Visão geral

```text
Demanda → Ocorrência → Operação → Coleta/retirada → Trânsito → Cliente
       → Carregamento/descarregamento → Porto/entrega → Comprovante → Finalização
```

Toda alteração de status é registrada no histórico com data, usuário, papel e observação. A aplicação também publica eventos internos para manter a projeção de documentos atualizada.

## 1. Preparação

Antes de abrir a operação, confirme:

- Transportadora ativa e selecionada.
- Motorista, cavalo mecânico e carreta disponíveis.
- Contêiner identificado (número, tamanho e demais informações disponíveis).
- Local de coleta e destino cadastrados.
- Cliente, quando aplicável, e documentos comerciais disponíveis.

## 2. Criar a demanda e a operação

Use `POST /operations` para criar de uma vez:

1. Uma ocorrência, inicialmente em `PENDING_DRIVER`.
2. A operação, inicialmente em `Created`.
3. O retrato do motorista/conjunto de veículos e do contêiner.
4. As etapas operacionais, se já conhecidas.

Cada etapa pode registrar local, ordem, agendamento, chegada ao portão/doca, data de embarque, porto, booking, navio, volumes e observações.

Também podem ser usados os endpoints específicos:

- `POST /operations/occurrences` — cria somente a ocorrência.
- `POST /operations/simple` — cria somente a operação.
- `POST /operations/steps` — adiciona uma etapa.
- `POST /operations/:id/invoices` — registra notas fiscais.

## 3. Fluxo de coleta

O fluxo `COLETA` é usado quando a transportadora coleta ou posiciona o contêiner para carregamento e posterior entrega no porto.

| Ordem | Status | Ação operacional | Requisito do sistema |
|---:|---|---|---|
| 1 | `Created` | Operação criada, e inclusão de etapas. | Dados básicos válidos. |
| 2 | `Collecting_Container` | Deslocamento para coleta após a definição do motorista e veículos. | Motorista, cavalo e carreta informados. A mudança é automática. |
| 3 | `In_Transit_To_Client` | Contêiner coletado e em trânsito ao cliente. | Foto do contêiner e comprovante de coleta (`CONTAINER_PHOTO`, `PICKUP_TICKET`). |
| 4 | `At_Client` | Chegada ao cliente. | — |
| 5 | `Loading` | Cliente inicia o carregamento. | — |
| 6 | `Loaded` | Carregamento concluído. | Nota fiscal cadastrada ou documento `INVOICE`. |
| 7 | `Port_Delivery` | Entrega/agendamento no porto. | CT-e, MDF-e e data/hora de agendamento. |
| 8 | `Finished` | Operação encerrada. | Comprovante de entrega (`DELIVERY_TICKET`). |

## 4. Fluxo de entrega

O fluxo `ENTREGA` é usado para retirar contêiner no porto/terminal e entregá-lo ao cliente.

| Ordem | Status | Ação operacional | Requisito do sistema |
|---:|---|---|---|
| 1 | `Created` | Operação criada. | Dados básicos válidos. |
| 2 | `Picking_Up_Container` | Retirada no porto. | Motorista, cavalo, carreta, CT-e e MDF-e. A mudança é automática. Nota fiscal e documentos da entrega são dados básicos da operação. |
| 3 | `In_Transit` | Contêiner em trânsito para o cliente. | `PICKUP_TICKET` |
| 4 | `At_Client` | Chegada ao cliente. | — |
| 5 | `Unloading` | Descarga em andamento. | — |
| 6 | `Unloaded` | Descarga finalizada. | Recebimento assinado e CT-e (`SIGNED_RECEIPT`, `CTE`). |
| 7 | `Finished` | Operação encerrada. | Comprovante de entrega (`DELIVERY_TICKET`). |

## 5. Atualizar status e anexar evidências

O sistema muda automaticamente os status iniciais de coleta e entrega quando os requisitos descritos acima são atendidos. Para as demais etapas, o operador altera o status usando:

```http
POST /operations/:id/transition
Authorization: Bearer <token>
Content-Type: application/json
```

Exemplo de agendamento/entrega no porto:

```json
{
  "toStatus": "Port_Delivery",
  "cteNumber": "123456",
  "mdfeNumber": "987654",
  "scheduledAt": "2026-08-13T14:00:00-03:00",
  "notes": "Janela confirmada pelo terminal"
}
```

Anexe os documentos antes da transição que os exige:

```http
POST /operations/documents/upload
Content-Type: multipart/form-data
```

Campos obrigatórios do upload: `file`, `operationId` e `transportadoraId`. Informe também `documentType` para que a validação da transição reconheça o documento.

Para consulta, download, visualização ou exclusão, use as rotas sob `/operations/documents`.

## 6. Contrato de integração — front-end e mobile

### Regra geral

O front-end e o mobile **não devem enviar `status`** no cadastro ou no `PUT` da operação. O status é calculado pelo backend, que devolve a operação atualizada nas criações e atualizações.

As transições automáticas acontecem após cada inclusão/atualização de dados ou após o upload de um documento. Para as etapas restantes, a interface deve exibir a ação adequada e chamar `POST /operations/:id/transition`.

### Coleta: dados e gatilhos automáticos

Para iniciar a coleta, envie ou atualize a operação com os campos abaixo. Eles podem ser enviados no `POST /operations` ou posteriormente em `PUT /operations/:id`.

```json
{
  "driver": {
    "driverId": "id-do-motorista",
    "cavaloId": "id-do-cavalo",
    "carretaId": "id-da-carreta"
  }
}
```

O backend também aceita `cavaloPlate` e `carretaPlate` no lugar dos respectivos IDs. Quando houver `driverId` e a identificação do cavalo e da carreta, a operação `COLETA` passa automaticamente de `Created` para `Collecting_Container`.

Para concluir a retirada e entrar em trânsito, o mobile deve:

1. Atualizar o contêiner com `container.containerNumber` e `container.size` usando `PUT /operations/:id`.
2. Enviar a foto do contêiner em `POST /operations/documents/upload`, com `documentType=CONTAINER_PHOTO`.
3. Enviar o bilhete de coleta na mesma rota, com `documentType=PICKUP_TICKET`.

Depois que os três requisitos existirem, a operação passa automaticamente para `In_Transit_To_Client`.

### Entrega: dados e gatilho automático

Para iniciar a retirada no porto, informe o motorista, o cavalo, a carreta e o CT-e/MDF-e. Os números podem ser enviados no cadastro ou na atualização:

```json
{
  "driver": {
    "driverId": "id-do-motorista",
    "cavaloId": "id-do-cavalo",
    "carretaId": "id-da-carreta"
  },
  "cteNumber": "123456",
  "mdfeNumber": "987654"
}
```

Alternativamente, o CT-e e o MDF-e podem ser anexados em `POST /operations/documents/upload` com `documentType=CTE` e `documentType=MDFE`. Quando os dados do motorista/veículos e as duas evidências fiscais existirem, a operação `ENTREGA` passa automaticamente de `Created` para `Picking_Up_Container`.

As notas fiscais e demais documentos comerciais devem ser cadastrados como dados básicos da operação, mas não são o gatilho desse primeiro status. Para seguir de `Picking_Up_Container` para `In_Transit`, anexe o bilhete de retirada como `PICKUP_TICKET` e execute a transição correspondente.

### Comportamento esperado das telas

- Exibir o status retornado pelo backend, sem alterá-lo localmente.
- Após o upload de um documento, atualizar a operação/listagem para refletir uma possível transição automática.
- Liberar botões de transição manual apenas para o próximo status permitido pelo fluxo.
- Exibir os documentos pendentes quando uma transição for recusada; a API informa os tipos obrigatórios ausentes.
- O mobile deve atuar somente sobre operações retornadas para o motorista autenticado.

## 7. Consulta pelo motorista

O aplicativo móvel usa:

- `GET /mobile/motoristas/:motoristaId/operations`
- `GET /mobile/motoristas/:motoristaId/occurrences`

O token deve ser de um usuário com papel `DRIVER` e vinculado ao mesmo `motoristaId` informado na URL.

## 8. Cancelamento e exceções

- Somente `ADMIN` ou `SUPER_ADMIN` pode mudar uma operação para `Cancelled`.
- O cancelamento requer observação com o motivo.
- Operação finalizada não pode ser cancelada.
- Não é permitido pular status; a API valida a próxima transição possível.
- Operações antigas podem seguir alguns status legados por compatibilidade, mas novas operações devem usar os fluxos descritos acima.

## Checklist de encerramento

- [ ] Status chegou a `Finished`.
- [ ] Comprovante de entrega anexado como `DELIVERY_TICKET`.
- [ ] CT-e/MDF-e e agendamento informados quando aplicáveis.
- [ ] Nota fiscal ou evidência de NF anexada quando aplicável.
- [ ] Histórico revisado e sem pendências de etapa/documento.
