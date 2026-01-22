import { IsString, IsNotEmpty, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import {
  ContainerSnapshotDto,
  DriverSnapshotDto,
} from "./driver-snapshot.dto";
import { OperationType } from "@shared/enums/operations/operation-type.enum";
import { OperationStatus } from "@shared/enums/occurrences/occurrences.enum";

export class UpdateOperationDto {
  @IsString()
  @IsNotEmpty()
  operationId!: string;

  @IsEnum(OperationType)
  @IsOptional()
  operationType?: OperationType;

  @IsString()
  @IsOptional()
  facilityCollectedId?: string;

  @ValidateNested()
  @Type(() => DriverSnapshotDto)
  @IsOptional()
  driver?: DriverSnapshotDto;

  @ValidateNested()
  @Type(() => ContainerSnapshotDto)
  @IsOptional()
  container?: ContainerSnapshotDto;

  @IsEnum(OperationStatus)
  @IsOptional()
  status?: OperationStatus;
}
