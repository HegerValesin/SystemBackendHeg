"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationStatus = exports.OperationStepStatus = exports.ContainerStatus = exports.ServiceOrderStatus = exports.OccurrenceStatus = void 0;
var OccurrenceStatus;
(function (OccurrenceStatus) {
    OccurrenceStatus["DRAFT"] = "DRAFT";
    OccurrenceStatus["PENDING_DRIVER"] = "PENDING_DRIVER";
    OccurrenceStatus["PENDING_CONTAINER_INFO"] = "PENDING_CONTAINER_INFO";
    OccurrenceStatus["CONTAINER_COLLECTED"] = "CONTAINER_COLLECTED";
    OccurrenceStatus["SENT_TO_CONTRACTOR"] = "SENT_TO_CONTRACTOR";
    OccurrenceStatus["LOADING_SCHEDULED"] = "LOADING_SCHEDULED";
    OccurrenceStatus["COMPLETED"] = "COMPLETED";
})(OccurrenceStatus || (exports.OccurrenceStatus = OccurrenceStatus = {}));
var ServiceOrderStatus;
(function (ServiceOrderStatus) {
    ServiceOrderStatus["DRAFT"] = "DRAFT";
    ServiceOrderStatus["PRINTED"] = "PRINTED";
    ServiceOrderStatus["IN_PROGRESS"] = "IN_PROGRESS";
    ServiceOrderStatus["COMPLETED"] = "COMPLETED";
    ServiceOrderStatus["CANCELLED"] = "CANCELLED";
})(ServiceOrderStatus || (exports.ServiceOrderStatus = ServiceOrderStatus = {}));
var ContainerStatus;
(function (ContainerStatus) {
    ContainerStatus["PENDENTE"] = "PENDING";
    ContainerStatus["COLETADO"] = "COLLECTED";
    ContainerStatus["EM_EXECU\u00C7\u00C3O"] = "IN_TRANSIT";
    ContainerStatus["FINALIZADO"] = "DELIVERED";
    ContainerStatus["CANCELADO"] = "CANCELLED";
})(ContainerStatus || (exports.ContainerStatus = ContainerStatus = {}));
var OperationStepStatus;
(function (OperationStepStatus) {
    OperationStepStatus["PENDENTE"] = "PENDENTE";
    OperationStepStatus["EM_EXECUCAO"] = "EM_EXECUCAO";
    OperationStepStatus["CONCLUIDA"] = "CONCLUIDA";
})(OperationStepStatus || (exports.OperationStepStatus = OperationStepStatus = {}));
var OperationStatus;
(function (OperationStatus) {
    OperationStatus["CRIADA"] = "CRIADA";
    OperationStatus["EM_EXECUCAO"] = "EM_EXECUCAO";
    OperationStatus["FINALIZADA"] = "FINALIZADA";
    OperationStatus["CANCELADA"] = "CANCELADA";
})(OperationStatus || (exports.OperationStatus = OperationStatus = {}));
//# sourceMappingURL=occurrences.enum.js.map