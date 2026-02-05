import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

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
}
