import { ContainerSnapshotDto, DriverSnapshotDto } from "./driver-snapshot.dto";
import { OperationType } from "@shared/enums/operations/operation-type.enum";
import { OperationStatus } from "@shared/enums/occurrences/occurrences.enum";
export declare class UpdateOperationDto {
    operationId: string;
    operationType?: OperationType;
    facilityCollectedId?: string;
    driver?: DriverSnapshotDto;
    container?: ContainerSnapshotDto;
    status?: OperationStatus;
}
