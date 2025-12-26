import { UserRole, UserStatus } from "@shared/enums/auth/user.enum";
export declare class CreateUserDto {
    email: string;
    senha: string;
    nome: string;
    telefone?: string;
    role: UserRole;
    status: UserStatus;
    transportadoraId: string;
    refreshToken?: string;
    tokenExpiresAt?: Date;
    lastLoginAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
