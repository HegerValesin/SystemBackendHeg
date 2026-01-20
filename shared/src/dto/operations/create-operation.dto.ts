import { IsString, IsNotEmpty, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import {
  ContainerSnapshotDto,
  DriverSnapshotDto,
} from "./driver-snapshot.dto";
import { OperationType } from "@shared/enums/operations/operation-type.enum";

export class CreateOperationDto {
  @IsString()
  @IsNotEmpty()
  occurrenceId!: string;

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
}
