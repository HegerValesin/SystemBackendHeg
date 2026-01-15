import type {
  ContainerSnapshotDto,
  DriverSnapshotDto,
} from "./driver-snapshot.dto";
import { OperationType } from "@shared/enums/operations/operation-type.enum";

export class CreateOperationDto {
  occurrenceId!: string;
  operationType!: OperationType;
  facilityCollectedId?: string; // ID da empresa onde será coletado
  driver!: DriverSnapshotDto; // Já contém os veículos selecionados
  container!: ContainerSnapshotDto;
}
