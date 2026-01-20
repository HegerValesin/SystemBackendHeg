import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class CreateOccurrenceDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(['DIGITAL', 'IMPORT'])
  origin!: 'DIGITAL' | 'IMPORT';

  @IsString()
  @IsNotEmpty()
  transportadoraId!: string;

  @IsString()
  @IsNotEmpty()
  facilityColectedId!: string;

  @IsString()
  @IsNotEmpty()
  facilityDestinationId!: string;
}
  