"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTransportadoraDto = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
class CreateTransportadoraDto {
    cnpj;
    razaoSocial;
    nomeFantasia;
    ativo;
    telefone;
    email;
    endereco;
    cidade;
    estado;
    cep;
}
exports.CreateTransportadoraDto = CreateTransportadoraDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'CNPJ é obrigatório' }),
    (0, class_validator_1.Matches)(/^\d{14}$/, { message: 'CNPJ deve conter 14 dígitos' }),
    __metadata("design:type", String)
], CreateTransportadoraDto.prototype, "cnpj", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Razão Social é obrigatória' }),
    __metadata("design:type", String)
], CreateTransportadoraDto.prototype, "razaoSocial", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTransportadoraDto.prototype, "nomeFantasia", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateTransportadoraDto.prototype, "ativo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^\(\d{2}\)\s?\d{4,5}-?\d{4}$/, { message: 'Telefone inválido' }),
    __metadata("design:type", String)
], CreateTransportadoraDto.prototype, "telefone", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Email inválido' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTransportadoraDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTransportadoraDto.prototype, "endereco", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTransportadoraDto.prototype, "cidade", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(2, 2, { message: 'Estado deve ter 2 caracteres (UF)' }),
    __metadata("design:type", String)
], CreateTransportadoraDto.prototype, "estado", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^\d{5}-?\d{3}$/, { message: 'CEP inválido' }),
    __metadata("design:type", String)
], CreateTransportadoraDto.prototype, "cep", void 0);
//# sourceMappingURL=create-transportadora.dto.js.map