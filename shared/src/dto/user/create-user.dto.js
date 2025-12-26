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
exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
const user_enum_1 = require("../../enums/auth/user.enum");
class CreateUserDto {
    email;
    senha;
    nome;
    telefone;
    role;
    status;
    transportadoraId;
    refreshToken;
    tokenExpiresAt;
    lastLoginAt;
    createdAt;
    updatedAt;
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: "Email inválido" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Informar a senha com caracteres e números" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "senha", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Nome é obrigatório" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "telefone", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Role é obrigatório" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Status é obrigatório" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Transportadora é obrigatória" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "transportadoraId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "refreshToken", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateUserDto.prototype, "tokenExpiresAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateUserDto.prototype, "lastLoginAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateUserDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateUserDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=create-user.dto.js.map