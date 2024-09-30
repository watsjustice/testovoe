import { ApiProperty } from '@nestjs/swagger';
import { ValidationEnum } from '../enum/validation.enum';
import { IsUUID } from 'class-validator';

export class IdDto {
  @ApiProperty()
  @IsUUID('all', { message: ValidationEnum.notUUID })
  id: string;
}
