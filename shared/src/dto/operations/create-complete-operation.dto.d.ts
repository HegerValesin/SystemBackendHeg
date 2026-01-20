import { ContainerSnapshotDto, DriverSnapshotDto } from "./driver-snapshot.dto";
import { OperationType } from "@shared/enums/operations/operation-type.enum";
import { InlineOperationStepDto } from "./inline-operation-step.dto";
export declare class InlineOccurrenceDto {
    origin: 'DIGITAL' | 'IMPORT';
    transportadoraId: string;
    facilityColectedId?: string;
    facilityDestinationId?: string;
}
export declare class CreateCompleteOperationDto {
    occurrence: InlineOccurrenceDto;
    operationType: OperationType;
    facilityCollectedId?: string;
    driver: DriverSnapshotDto;
    container: ContainerSnapshotDto;
    steps?: InlineOperationStepDto[];
}
