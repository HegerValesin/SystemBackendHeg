import { PartialType } from '@nestjs/mapped-types';
import { CreateVeiculoDto } from './create-veiculo.dto';
import type { UUID } from 'crypto';

export class UpdateVeiculoDto extends PartialType(CreateVeiculoDto) {
  id!: UUID;
}
