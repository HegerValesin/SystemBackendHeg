import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: "CPF é obrigatório" })
  @Matches(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, { message: "CPF inválido" })
  cpf!: string;

  @IsString()
  @IsNotEmpty({ message: "Senha é obrigatória" })
  @MinLength(6, { message: "Senha deve ter no mínimo 6 caracteres" })
  senha!: string;
}
