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
exports.CreateVeiculoDto = void 0;
const class_validator_1 = require("class-validator");
const vaiculos_enum_1 = require("../../enums/veiculo/vaiculos.enum");
class CreateVeiculoDto {
    placa;
    renavam;
    tipo;
    marca;
    modelo;
    ano;
    cor;
    ativo = true;
    transportadoraId;
}
exports.CreateVeiculoDto = CreateVeiculoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(7, { message: 'A placa deve ter no mínimo 7 caracteres' }),
    __metadata("design:type", String)
], CreateVeiculoDto.prototype, "placa", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateVeiculoDto.prototype, "renavam", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(vaiculos_enum_1.TipoVeiculo, {
        message: 'O tipo deve ser um dos valores: ' + Object.values(vaiculos_enum_1.TipoVeiculo).join(', '),
    }),
    __metadata("design:type", String)
], CreateVeiculoDto.prototype, "tipo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateVeiculoDto.prototype, "marca", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateVeiculoDto.prototype, "modelo", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateVeiculoDto.prototype, "ano", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVeiculoDto.prototype, "cor", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateVeiculoDto.prototype, "ativo", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateVeiculoDto.prototype, "transportadoraId", void 0);
//# sourceMappingURL=create-veiculo.dto.js.map