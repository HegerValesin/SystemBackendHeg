export declare class DriverSnapshotDto {
    driverId: string;
    name: string;
    cpf: string;
    phone?: string;
    cnh?: string;
}
export declare class ContainerSnapshotDto {
    containerNumber: string;
    size?: string;
    status?: 'VAZIO' | 'CHEIO';
    tara?: string;
    lacre?: string;
    gensetNumber?: string;
    armador?: string;
}
