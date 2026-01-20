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
exports.CreateOperationDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const driver_snapshot_dto_1 = require("./driver-snapshot.dto");
const operation_type_enum_1 = require("../../enums/operations/operation-type.enum");
class CreateOperationDto {
    occurrenceId;
    operationType;
    facilityCollectedId;
    driver;
    container;
}
exports.CreateOperationDto = CreateOperationDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOperationDto.prototype, "occurrenceId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(operation_type_enum_1.OperationType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOperationDto.prototype, "operationType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOperationDto.prototype, "facilityCollectedId", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => driver_snapshot_dto_1.DriverSnapshotDto),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", driver_snapshot_dto_1.DriverSnapshotDto)
], CreateOperationDto.prototype, "driver", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => driver_snapshot_dto_1.ContainerSnapshotDto),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", driver_snapshot_dto_1.ContainerSnapshotDto)
], CreateOperationDto.prototype, "container", void 0);
//# sourceMappingURL=create-operation.dto.js.map