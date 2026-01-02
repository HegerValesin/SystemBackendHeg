import { PartialType } from '@nestjs/mapped-types';
import { CreateVeiculoDto } from './create-veiculo.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateVeiculoDto extends PartialType(CreateVeiculoDto) {
  @IsBoolean()
  @IsOptional()
  ativo?: boolean;

  @IsString()
  @IsOptional()
  placa?: string;
}
