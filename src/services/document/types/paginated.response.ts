import { ApiProperty } from "@nestjs/swagger";
import { Document } from "../entities/document.entity";

export class DocumentPaginatedRepsonse {
    @ApiProperty()
    results: Document[];

    @ApiProperty()
    pagesCount: number;

    @ApiProperty()
    currentPage: number;

    @ApiProperty()
    rows: number;
}
