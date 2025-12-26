import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, Matches } from "class-validator";

export class CreateClienteDto {
  @IsString()
  @IsNotEmpty({ message: 'CNPJ/CPF é obrigatório' })
  @Matches(/^(\d{11}|\d{14})$/, { message: 'CNPJ/CPF inválido' })
  cnpjCpf!: string;

  @IsString()
  @IsNotEmpty({ message: 'Razão Social é obrigatória' })
  razaoSocial!: string;

  @IsString()
  @IsOptional()
  nomeFantasia?: string;

  @IsString()
  @IsOptional()
  telefone?: string;

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
