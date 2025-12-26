import { PartialType } from 'nestjs-mapped-types';
import { CreateTransportadoraDto } from './create-transportadora.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateTransportadoraDto extends PartialType(CreateTransportadoraDto) {
  @IsBoolean()
  @IsOptional()
  ativo?: boolean;
}