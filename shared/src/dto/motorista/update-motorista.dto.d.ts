import { CreateMotoristaDto } from './create-motorista.dto';
declare const UpdateMotoristaDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateMotoristaDto>>;
export declare class UpdateMotoristaDto extends UpdateMotoristaDto_base {
    ativo?: boolean;
}
export {};
