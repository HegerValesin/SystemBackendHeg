import { IsString, IsNotEmpty, IsOptional, IsEmail, IsUUID, Matches, IsDateString } from 'class-validator';

export class CreateMotoristaDto {
  @IsString()
  @IsNotEmpty({ message: 'CPF é obrigatório' })
  @Matches(/^\d{11}$/, { message: 'CPF deve conter 11 dígitos' })
  cpf!: string;

  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome!: string;

  @IsString()
  @IsNotEmpty({ message: 'CNH é obrigatória' })
  cnh!: string;

  @IsString()
  @IsNotEmpty({ message: 'Categoria CNH é obrigatória' })
  @Matches(/^[A-E]{1,2}$/, { message: 'Categoria CNH inválida' })
  categoriaCnh!: string;

  @IsDateString({}, { message: 'Data de validade da CNH inválida' })
  @IsNotEmpty({ message: 'Validade da CNH é obrigatória' })
  validadeCnh!: string;

  @IsString()
  @IsNotEmpty({ message: 'Telefone é obrigatório' })
  telefone!: string;

  @IsEmail({}, { message: 'Email inválido' })
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  endereco?: string;

  @IsString()
  @IsOptional()
  cidade?: string;

  @IsString()
  @IsOptional()
  estado?: string;

  @IsString()
  @IsOptional()
  cep?: string;

  @IsUUID()
  @IsNotEmpty({ message: 'TransportadoraId é obrigatório' })
  transportadoraId!: string;
}
