import { CreateTransportadoraDto } from './create-transportadora.dto';
declare const UpdateTransportadoraDto_base: import("nestjs-mapped-types").MappedType<Partial<CreateTransportadoraDto>>;
export declare class UpdateTransportadoraDto extends UpdateTransportadoraDto_base {
    ativo?: boolean;
}
export {};
