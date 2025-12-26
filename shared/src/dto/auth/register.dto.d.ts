import { UserRole } from '../../enums/auth/user.enum';
export declare class RegisterDto {
    email: string;
    senha: string;
    nome: string;
    telefone?: string;
    role: UserRole;
    transportadoraId: string;
}
