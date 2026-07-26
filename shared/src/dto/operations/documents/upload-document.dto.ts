import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { OperationDocumentType } from '@shared/enums/operations/document-type.enum';

export class UploadDocumentDto {
  @IsString()
  @IsNotEmpty()
  operationId!: string;

  @IsString()
  @IsNotEmpty()
  transportadoraId!: string;
  
  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(OperationDocumentType)
  @IsOptional()
  documentType?: OperationDocumentType;
}
