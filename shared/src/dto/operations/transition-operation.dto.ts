import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { OperationStatus } from '@shared/enums/occurrences/occurrences.enum';

export class TransitionOperationDto {
  @IsEnum(OperationStatus)
  toStatus!: OperationStatus;

  @IsDateString()
  @IsOptional()
  occurredAt?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  cteNumber?: string;

  @IsString()
  @IsOptional()
  mdfeNumber?: string;

  @IsDateString()
  @IsOptional()
  scheduledAt?: string;

  @IsString()
  @IsOptional()
  transferTripCode?: string;
}
