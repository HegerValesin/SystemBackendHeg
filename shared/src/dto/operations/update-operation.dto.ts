import { IsString, IsNotEmpty, IsEnum, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import {
  ContainerSnapshotDto,
  DriverSnapshotDto,
} from "./driver-snapshot.dto";
import { OperationType } from "@shared/enums/operations/operation-type.enum";
import { OperationStatus } from "@shared/enums/occurrences/occurrences.enum";
import { OperationInvoiceItemDto } from './set-operation-invoices.dto';

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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OperationInvoiceItemDto)
  @IsOptional()
  invoices?: OperationInvoiceItemDto[];
}
