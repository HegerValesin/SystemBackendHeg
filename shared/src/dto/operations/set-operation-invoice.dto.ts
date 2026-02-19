import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SetOperationInvoiceDto {
  @IsString()
  @IsNotEmpty()
  operationId!: string;

  @IsString()
  @IsOptional()
  invoiceNumber?: string;

  @IsString()
  @IsOptional()
  invoiceKey?: string;

}
