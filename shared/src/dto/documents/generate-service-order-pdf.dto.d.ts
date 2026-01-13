export declare class GenerateServiceOrderPdfDto {
    osNumber: string;
    transportadora: {
        name: string;
        cnpj: string;
        address: string;
        phone?: string;
        email?: string;
    };
    driver: {
        name: string;
        cpf: string;
        phone?: string;
        cnh?: string;
    };
    container: {
        containerNumber: string;
        size?: string;
        status?: string;
        tara?: string;
        lacre?: string;
        gensetNumber?: string;
        armador?: string;
    };
    operationStep: {
        localName: string;
        scheduledAt: string;
        stepOrder: number;
    };
    observations?: string;
}
