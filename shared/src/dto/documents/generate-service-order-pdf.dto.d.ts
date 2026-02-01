import type { OperationStatus } from "@shared/enums/occurrences/occurrences.enum";
import type { OperationType } from "@shared/enums/operations/operation-type.enum";
export declare class GenerateServiceOrderPdfDto {
    id?: string;
    operation: {
        id?: string;
        operationNumber?: string;
        driver: {
            id?: string;
            driverId?: string;
            name?: string;
            cpf?: string;
            phone?: string;
            cnh?: string;
            cavaloId?: string;
            cavaloPlate?: string;
            carretaId?: string;
            carretaPlate?: string;
        };
        container: {
            id?: string;
            containerNumber?: string;
            size?: string;
            status?: string;
            tara?: string;
            lacre?: string;
            gensetNumber?: string;
            armador?: string;
        };
        status?: OperationStatus;
        operationType?: OperationType;
        facilityCollectedId?: string;
        montagem?: string;
        createdAt?: string;
        updatedAt?: string;
    };
    operationStep: {
        id?: string;
        localName?: string;
        scheduledDistributionTime?: string;
        truckAtGateTime?: string;
        gateEntryTime?: string;
        truckAtDockTime?: string;
        shippingDate?: string;
        stepOrder?: number;
        status?: string;
        port?: string;
        bookingNumber?: string;
        ship?: string;
        scheduledAt?: string;
        sheduledClient?: string;
        volumes?: number;
        observations?: string | null;
        facilityCollectedId?: string;
    };
    osNumber?: string;
    transportadora: {
        cnpj: string;
        razaoSocial: string;
        nomeFantasia?: string;
        iE?: string;
        iM?: string;
        cep?: string;
        endereco?: string;
        numero?: string;
        complemento?: string;
        bairro?: string;
        cidade?: string;
        uf?: string;
        telefone?: string;
        celular?: string;
        email?: string;
    };
    remetente: {
        name: string;
        cnpj?: string;
    };
}
