import { TypeClient } from "@shared/enums/client/clients.enum";
export declare class CreateClienteDto {
    cnpjCpf: string;
    tipo: TypeClient;
    nome: string;
    nomeFantasia?: string;
    iE?: string;
    iM?: string;
    telefone?: string;
    celular?: string;
    email?: string;
    cep?: string;
    endereco?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    uf?: string;
    observacao?: string;
    site?: string;
    transportadoraId: string;
    ativo: boolean;
}
