import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ValidationEnum } from '../../../utils/enum/validation.enum';

export class BatchDocumentQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ValidationEnum.notString })
  title?: string = null;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt({ message: ValidationEnum.notInt })
  @Type(() => Number)
  page?: number = 0;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt({ message: ValidationEnum.notInt })
  @Type(() => Number)
  limit?: number = 0;
}
