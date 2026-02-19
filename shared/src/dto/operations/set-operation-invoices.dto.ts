import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class OperationInvoiceItemDto {
  @IsString()
  @IsNotEmpty()
  invoiceNumber!: string;

  @IsString()
  @IsNotEmpty()
  invoiceKey!: string;
}

export class SetOperationInvoicesDto {
  @IsString()
  @IsNotEmpty()
  operationId!: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OperationInvoiceItemDto)
  invoices!: OperationInvoiceItemDto[];
}
