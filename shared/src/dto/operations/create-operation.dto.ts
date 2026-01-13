import type {
  ContainerSnapshotDto,
  DriverSnapshotDto,
} from "./driver-snapshot.dto";

export class CreateOperationDto {
  occurrenceId!: string;
  driver!: DriverSnapshotDto;
  container!: ContainerSnapshotDto;
}
