import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, MinLength } from "class-validator";
import { UserRole } from '../../enums/auth/user.enum';

export class RegisterDto {
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email!: string;

  @IsString()
  @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
  senha!: string;

  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome!: string;

  @IsString()
  @IsOptional()
  telefone?: string;

  @IsEnum(UserRole)
  role!: UserRole;

  @IsUUID()
  @IsNotEmpty({ message: 'TransportadoraId é obrigatório' })
  transportadoraId!: string;
}