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
exports.CreateCompleteOperationDto = exports.InlineOccurrenceDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const driver_snapshot_dto_1 = require("./driver-snapshot.dto");
const operation_type_enum_1 = require("../../enums/operations/operation-type.enum");
const inline_operation_step_dto_1 = require("./inline-operation-step.dto");
class InlineOccurrenceDto {
    origin;
    transportadoraId;
    facilityColectedId;
    facilityDestinationId;
}
exports.InlineOccurrenceDto = InlineOccurrenceDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InlineOccurrenceDto.prototype, "origin", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InlineOccurrenceDto.prototype, "transportadoraId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], InlineOccurrenceDto.prototype, "facilityColectedId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], InlineOccurrenceDto.prototype, "facilityDestinationId", void 0);
class CreateCompleteOperationDto {
    occurrence;
    operationType;
    facilityCollectedId;
    driver;
    container;
    steps;
}
exports.CreateCompleteOperationDto = CreateCompleteOperationDto;
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => InlineOccurrenceDto),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", InlineOccurrenceDto)
], CreateCompleteOperationDto.prototype, "occurrence", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(operation_type_enum_1.OperationType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCompleteOperationDto.prototype, "operationType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCompleteOperationDto.prototype, "facilityCollectedId", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => driver_snapshot_dto_1.DriverSnapshotDto),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", driver_snapshot_dto_1.DriverSnapshotDto)
], CreateCompleteOperationDto.prototype, "driver", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => driver_snapshot_dto_1.ContainerSnapshotDto),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", driver_snapshot_dto_1.ContainerSnapshotDto)
], CreateCompleteOperationDto.prototype, "container", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => inline_operation_step_dto_1.InlineOperationStepDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateCompleteOperationDto.prototype, "steps", void 0);
//# sourceMappingURL=create-complete-operation.dto.js.map