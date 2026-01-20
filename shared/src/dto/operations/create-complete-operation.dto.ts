import { IsString, IsNotEmpty, IsEnum, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import {
  ContainerSnapshotDto,
  DriverSnapshotDto,
} from "./driver-snapshot.dto";
import { OperationType } from "@shared/enums/operations/operation-type.enum";
import { InlineOperationStepDto } from "./inline-operation-step.dto";

// DTO para criar ocorrência inline
export class InlineOccurrenceDto {
  @IsString()
  @IsNotEmpty()
  origin!: 'DIGITAL' | 'IMPORT';

  @IsString()
  @IsNotEmpty()
  transportadoraId!: string;

  @IsString()
  @IsOptional()
  facilityColectedId?: string;

  @IsString()
  @IsOptional()
  facilityDestinationId?: string;
}

// DTO para criar operação completa (occurrence + operation + steps)
export class CreateCompleteOperationDto {
  @ValidateNested()
  @Type(() => InlineOccurrenceDto)
  @IsNotEmpty()
  occurrence!: InlineOccurrenceDto;

  @IsEnum(OperationType)
  @IsNotEmpty()
  operationType!: OperationType;

  @IsString()
  @IsOptional()
  facilityCollectedId?: string;

  @ValidateNested()
  @Type(() => DriverSnapshotDto)
  @IsNotEmpty()
  driver!: DriverSnapshotDto;

  @ValidateNested()
  @Type(() => ContainerSnapshotDto)
  @IsNotEmpty()
  container!: ContainerSnapshotDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InlineOperationStepDto)
  @IsOptional()
  steps?: InlineOperationStepDto[];
}
