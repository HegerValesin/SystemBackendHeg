import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { UserRole, UserStatus } from "@shared/enums/auth/user.enum";

export class CreateUserDto {
  @IsEmail({}, { message: "Email inválido" })
  email!: string;

  @IsNotEmpty({ message: "Informar a senha com caracteres e números" })
  senha!: string;

  @IsNotEmpty({ message: "Nome é obrigatório" })
  nome!: string;

  @IsOptional()
  telefone?: string;

  @IsNotEmpty({ message: "Role é obrigatório" })
  role!: UserRole;
  
  @IsNotEmpty({ message: "Status é obrigatório" })
  status!: UserStatus;
  
  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsNotEmpty({ message: "Transportadora é obrigatória" })
  transportadoraIds!: string[];

  @IsOptional()
  @IsUUID()
  transportadoraId?: string;
  
  @IsOptional()
  refreshToken?: string;
  
  @IsOptional()
  tokenExpiresAt?: Date;
  
  @IsOptional()
  lastLoginAt?: Date;
  
  @IsOptional()
  createdAt?: Date;
  
  @IsOptional()
  updatedAt?: Date;
}
