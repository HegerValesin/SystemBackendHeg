import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
  @IsBoolean()
  @IsOptional()
  ativo!: boolean;
}
