import { IsUUID, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class VincularVeiculoDto {
  @IsUUID()
  @IsNotEmpty({ message: 'MotoristaId é obrigatório' })
  motoristaId!: string;

  @IsUUID()
  @IsNotEmpty({ message: 'VeiculoId é obrigatório' })
  veiculoId!: string;

  @IsDateString()
  @IsOptional()
  dataInicio?: string;

  @IsDateString()
  @IsOptional()
  dataFim?: string;
}