import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

// DTO para criar step inline (sem operationId, pois será preenchido automaticamente)
export class InlineOperationStepDto {
  @IsString()
  @IsNotEmpty()
  localName!: string;

  @IsString()
  @IsNotEmpty()
  scheduledAt!: string; // ISO

  @IsNumber()
  @IsNotEmpty()
  stepOrder!: number;

  // Campos adicionais (opcionais) para detalhar a etapa
  @IsString()
  @IsOptional()
  scheduledDistributionTime?: string; // HH:mm ou ISO

  @IsString()
  @IsOptional()
  truckAtGateTime?: string; // HH:mm ou ISO

  @IsString()
  @IsOptional()
  gateEntryTime?: string; // HH:mm ou ISO

  @IsString()
  @IsOptional()
  truckAtDockTime?: string; // HH:mm ou ISO

  @IsString()
  @IsOptional()
  shippingDate?: string; // data (ISO ou dd/MM/yyyy)

  @IsString()
  @IsOptional()
  port?: string;

  @IsString()
  @IsOptional()
  bookingNumber?: string;

  @IsString()
  @IsOptional()
  ship?: string;

  @IsString()
  @IsOptional()
  sheduledClient?: string; // data/hora de agenda

  @IsNumber()
  @IsOptional()
  volumes?: number;

  @IsString()
  @IsOptional()
  observations?: string;
}
