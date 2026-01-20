import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class DriverSnapshotDto {
  @IsString()
  @IsOptional()
  driverId?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  cpf?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  cnh?: string;

  // Veículos selecionados para esta operação
  @IsString()
  @IsOptional()
  cavaloId?: string;

  @IsString()
  @IsOptional()
  cavaloPlate?: string;

  @IsString()
  @IsOptional()
  carretaId?: string;

  @IsString()
  @IsOptional()
  carretaPlate?: string;
}

export class ContainerSnapshotDto {
  @IsString()
  @IsOptional()
  containerNumber?: string;

  @IsString()
  @IsOptional()
  size?: string;

  @IsString()
  @IsOptional()
  @IsIn(['VAZIO', 'CHEIO'])
  status?: 'VAZIO' | 'CHEIO';

  @IsString()
  @IsOptional()
  tara?: string;

  @IsString()
  @IsOptional()
  lacre?: string;

  @IsString()
  @IsOptional()
  gensetNumber?: string;

  @IsString()
  @IsOptional()
  armador?: string;
}