export enum OccurrenceStatus {
    DRAFT = 'DRAFT',
    PENDING_DRIVER = 'PENDING_DRIVER',
    PENDING_CONTAINER_INFO = 'PENDING_CONTAINER_INFO',
    CONTAINER_COLLECTED = 'CONTAINER_COLLECTED',
    SENT_TO_CONTRACTOR = 'SENT_TO_CONTRACTOR',
    LOADING_SCHEDULED = 'LOADING_SCHEDULED',
    COMPLETED = 'COMPLETED',
  }

  export enum ServiceOrderStatus {
    DRAFT = 'DRAFT',
    PRINTED = 'PRINTED',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
  }

  export enum ContainerStatus {
    PENDENTE = 'PENDING',
    COLETADO = 'COLLECTED',
    EM_EXECUÇÃO = 'IN_TRANSIT',
    FINALIZADO = 'DELIVERED',
    CANCELADO = 'CANCELLED',
  }

  export enum OperationStepStatus {
    PENDENTE = 'PENDENTE',
    EM_EXECUCAO = 'EM_EXECUCAO',
    CONCLUIDA = 'CONCLUIDA',
  }
  
  export enum OperationStatus {
    CRIADA = 'Created',
    COLETANDO_CONTAINER = 'Collecting_Container',
    RETIRANDO_CONTAINER = 'Picking_Up_Container',
    COLETADO = 'Collected',
    EM_TRANSITO = 'In_Transit',
    EM_TRANSITO_PARA_CLIENTE = 'In_Transit_To_Client',
    NO_CLIENTE = 'At_Client',
    CARREGANDO = 'Loading',
    CARREGADO = 'Loaded',
    DESCARREGANDO = 'Unloading',
    DESCARREGADO = 'Unloaded',
    AGENDADO_NO_PORTO = 'Port_Scheduled',
    ENTREGA_PORTO = 'Port_Delivery',
    ENTREGANDO = 'Delivering',
    DEVOLVENDO = 'Returning',
    FINALIZADA = 'Finished',
    CANCELADA = 'Cancelled',
  }
