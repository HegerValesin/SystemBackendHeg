import { TipoVeiculo } from '../../enums/veiculo/vaiculos.enum';
export declare class CreateVeiculoDto {
    placa: string;
    renavam: string;
    tipo: TipoVeiculo;
    marca: string;
    modelo: string;
    ano: number;
    cor?: string;
    ativo?: boolean;
    transportadoraId: string;
}
