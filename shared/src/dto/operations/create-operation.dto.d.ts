import type { ContainerSnapshotDto, DriverSnapshotDto } from "./driver-snapshot.dto";
import { OperationType } from "@shared/enums/operations/operation-type.enum";
export declare class CreateOperationDto {
    occurrenceId: string;
    operationType: OperationType;
    facilityCollectedId?: string;
    driver: DriverSnapshotDto;
    container: ContainerSnapshotDto;
}
