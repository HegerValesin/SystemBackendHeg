export class CreateOperationStepDto {
    operationId!: string;
    localName!: string;
    scheduledAt!: string; // ISO
    stepOrder!: number;
  // Campos adicionais (opcionais) para detalhar a etapa
  scheduledDistributionTime?: string; // HH:mm ou ISO
  truckAtGateTime?: string; // HH:mm ou ISO
  gateEntryTime?: string; // HH:mm ou ISO
  truckAtDockTime?: string; // HH:mm ou ISO
  shippingDate?: string; // data (ISO ou dd/MM/yyyy)
  port?: string;
  bookingNumber?: string;
  ship?: string;
  sheduledClient?: string; // data/hora de agenda
  volumes?: number;
  observations?: string;
  }
  