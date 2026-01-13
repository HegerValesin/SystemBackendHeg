export class CreateOperationStepDto {
    operationId!: string;
    localName!: string;
    scheduledAt!: string; // ISO
    stepOrder!: number;
  }
  