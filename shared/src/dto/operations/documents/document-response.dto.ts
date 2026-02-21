export class DocumentResponseDto {
  id!: string;
  operationId!: string;
  transportadoraId!: string;
  fileName!: string;
  fileType!: string;
  fileSize!: number;
  description?: string;
  createdAt!: Date;
  updatedAt!: Date;
  isActive!: boolean;
}
