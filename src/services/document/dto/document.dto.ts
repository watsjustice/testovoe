import { ApiProperty } from "@nestjs/swagger";
import { ValidationEnum } from "../../../utils/enum/validation.enum";
import { IsString } from 'class-validator';

export class DocumentDto {
    @ApiProperty()
    @IsString({ message: ValidationEnum.NotString })
    title: string;
}
