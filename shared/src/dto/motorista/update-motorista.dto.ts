import { PartialType } from '@nestjs/mapped-types';
import { CreateMotoristaDto } from './create-motorista.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateMotoristaDto extends PartialType(CreateMotoristaDto) {
  @IsBoolean()
  @IsOptional()
  ativo?: boolean;
}
