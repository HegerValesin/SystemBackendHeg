import { TypeClient } from "@shared/enums/client/clients.enum";
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, Matches } from "class-validator";
import { Column } from "typeorm";

export class CreateClienteDto {
  @IsString()
  @IsNotEmpty({ message: 'CNPJ/CPF é obrigatório' })
  @Matches(/^(\d{11}|\d{14})$/, { message: 'CNPJ/CPF inválido' })
  cnpjCpf!: string;

  @IsString()
  @IsNotEmpty({ message: 'Tipo é obrigatório' })
  @IsEnum(TypeClient, { message: 'Tipo inválido' })
  tipo!: TypeClient;

  @IsString()
  @IsNotEmpty({ message: 'Nome/Razão Social é obrigatória' })
  nome!: string;

  @IsString()
  @IsOptional()
  nomeFantasia?: string;

  @IsString()
  @IsOptional()
  iE?: string;

  @IsString()
  @IsOptional()
  iM?: string;

  @IsString()
  @IsOptional()
  @Matches(/^\(\d{2}\)\s?\d{4,5}-?\d{4}$/, { message: 'Telefone inválido' })
  telefone?: string;

  @IsString()
  @IsOptional()
  @Matches(/^\(\d{2}\)\s?\d{4,5}-?\d{4}$/, { message: 'Celular inválido' })
  celular?: string;

  @IsEmail({}, { message: 'Email inválido' })
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @Matches(/^\d{5}-?\d{3}$/, { message: 'CEP inválido' })
  cep?: string;

  @IsString()
  @IsOptional()
  endereco?: string;

  @IsString()
  @IsOptional()
  numero?: string;

  @IsString()
  @IsOptional()
  complemento?: string;

  @IsString()
  @IsOptional()
  bairro?: string;

  @IsString()
  @IsOptional()
  cidade?: string;

  @IsString()
  @IsOptional()
  uf?: string;

  @IsString()
  @IsOptional()
  observacao?: string;

  @IsString()
  @IsOptional()
  site?: string;

  @IsUUID()
  @IsNotEmpty({ message: 'TransportadoraId é obrigatório' })
  transportadoraId!: string;

  @Column({ default: true }) // VERIFIQUE SE ESTA LINHA EXISTE
  @IsBoolean()
  ativo!: boolean;
}
