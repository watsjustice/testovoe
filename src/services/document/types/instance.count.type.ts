import { ApiProperty } from "@nestjs/swagger";
import { Document } from "../entities/document.entity";

export class DocumentInstanceWithCountType {
    @ApiProperty()
    instances: Document[];

    @ApiProperty()
    count: number;
}
