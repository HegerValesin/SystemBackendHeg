import { 
  IsString, 
  IsEnum, 
  IsInt, 
  IsOptional, 
  IsBoolean, 
  IsUUID, 
  IsNotEmpty,
  MinLength
} from 'class-validator';
import { TipoVeiculo } from '../../enums/veiculo/vaiculos.enum';

export class CreateVeiculoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(7, { message: 'A placa deve ter no mínimo 7 caracteres' })
  placa!: string;

  @IsString()
  @IsNotEmpty()
  renavam!: string;

  @IsEnum(TipoVeiculo, {
    message: 'O tipo deve ser um dos valores: ' + Object.values(TipoVeiculo).join(', '),
  })
  tipo!: TipoVeiculo;

  @IsString()
  @IsNotEmpty()
  marca!: string;

  @IsString()
  @IsNotEmpty()
  modelo!: string;

  @IsInt()
  ano!: number;

  @IsString()
  @IsOptional()
  cor?: string;

  @IsBoolean()
  @IsOptional()
  ativo?: boolean = true;

  @IsUUID()
  @IsNotEmpty()
  transportadoraId!: string;
}