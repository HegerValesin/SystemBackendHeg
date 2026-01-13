import type { ContainerSnapshotDto, DriverSnapshotDto } from "./driver-snapshot.dto";
export declare class CreateOperationDto {
    occurrenceId: string;
    driver: DriverSnapshotDto;
    container: ContainerSnapshotDto;
}
