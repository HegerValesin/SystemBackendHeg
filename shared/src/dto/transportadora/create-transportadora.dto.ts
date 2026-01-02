import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches } from "class-validator";
import { Column } from "typeorm";

export class CreateTransportadoraDto {
  @IsString()
  @IsNotEmpty({ message: 'CNPJ é obrigatório' })
  @Matches(/^\d{14}$/, { message: 'CNPJ deve conter 14 dígitos' })
  cnpj!: string;

  @IsString()
  @IsNotEmpty({ message: 'Razão Social é obrigatória' })
  razaoSocial!: string;

  @IsString()
  @IsOptional()
  nomeFantasia?: string;

  @IsString()
  @IsOptional()
  iE?: string;
  
  @IsString()
  @IsOptional()
  iM?: string;

  @Column({ default: true }) // VERIFIQUE SE ESTA LINHA EXISTE
  @IsBoolean()
  ativo!: boolean;

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
  site?: string;
  
  @IsString()
  @IsOptional()
  endereco?: string;

  @IsString()
  @IsOptional()
  numero?: string;

  @IsString()
  @IsOptional()
  bairro?: string;

  @IsString()
  @IsOptional()
  complemento?: string;

  @IsString()
  @IsOptional()
  cidade?: string;

  @IsString()
  @IsOptional()
  @Length(2, 2, { message: 'Estado deve ter 2 caracteres (UF)' })
  estado?: string;

  @IsString()
  @IsOptional()
  @Matches(/^\d{5}-?\d{3}$/, { message: 'CEP inválido' })
  cep?: string;

  @IsString()
  @IsOptional()
  observacao?: string;

}