export class DriverSnapshotDto {
  driverId!: string;
  name!: string;
  cpf!: string;
  phone?: string;
  cnh?: string;
  // Veículos selecionados para esta operação
  cavaloId?: string;
  cavaloPlate?: string;
  carretaId?: string;
  carretaPlate?: string;
}

export class ContainerSnapshotDto {
  containerNumber!: string;
  size?: string;
  status?: 'VAZIO' | 'CHEIO';
  tara?: string;
  lacre?: string;
  gensetNumber?: string;
  armador?: string;
}