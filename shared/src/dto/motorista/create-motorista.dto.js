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
exports.CreateMotoristaDto = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
class CreateMotoristaDto {
    cpf;
    nome;
    cnh;
    categoriaCnh;
    validadeCnh;
    telefone;
    email;
    endereco;
    cidade;
    estado;
    cep;
    ativo;
    transportadoraId;
}
exports.CreateMotoristaDto = CreateMotoristaDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'CPF é obrigatório' }),
    (0, class_validator_1.Matches)(/^\d{11}$/, { message: 'CPF deve conter 11 dígitos' }),
    __metadata("design:type", String)
], CreateMotoristaDto.prototype, "cpf", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Nome é obrigatório' }),
    __metadata("design:type", String)
], CreateMotoristaDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'CNH é obrigatória' }),
    __metadata("design:type", String)
], CreateMotoristaDto.prototype, "cnh", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Categoria CNH é obrigatória' }),
    (0, class_validator_1.Matches)(/^[A-E]{1,2}$/, { message: 'Categoria CNH inválida' }),
    __metadata("design:type", String)
], CreateMotoristaDto.prototype, "categoriaCnh", void 0);
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: 'Data de validade da CNH inválida' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Validade da CNH é obrigatória' }),
    __metadata("design:type", String)
], CreateMotoristaDto.prototype, "validadeCnh", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Telefone é obrigatório' }),
    __metadata("design:type", String)
], CreateMotoristaDto.prototype, "telefone", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Email inválido' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMotoristaDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMotoristaDto.prototype, "endereco", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMotoristaDto.prototype, "cidade", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMotoristaDto.prototype, "estado", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMotoristaDto.prototype, "cep", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateMotoristaDto.prototype, "ativo", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'TransportadoraId é obrigatório' }),
    __metadata("design:type", String)
], CreateMotoristaDto.prototype, "transportadoraId", void 0);
//# sourceMappingURL=create-motorista.dto.js.map