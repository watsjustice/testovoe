import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { IdDto } from '../../utils/dto/id.dto';
import { DocumentService } from './document.service';
import { DocumentDto } from './dto/document.dto';
import { BatchDocumentQueryDto } from './dto/search-document.dto';
import { Document } from './entities/document.entity';

const routeName = '/document';

@ApiTags(routeName)
@Controller(routeName)
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @Put()
  @ApiResponse({ type: Document })
  async updateDocument(@Query() Iddto: IdDto, @Body() dto: DocumentDto) {
    return this.documentService.update(Iddto.id, dto);
  }

  @Post()
  @ApiResponse({ type: Document })
  async createDocument(@Body() dto: DocumentDto) {
    return this.documentService.create(dto);
  }

  @Delete()
  @ApiResponse({ type: Document })
  async deleteAmenity(@Query() dto: IdDto) {
    return this.documentService.delete(dto.id);
  }

  @Get(':id')
  @ApiResponse({ type: Document })
  async getDocument(@Param() dto: IdDto) {
    return this.documentService.getDocumentByIDorThrow(dto.id);
  }

  @Get()
  @ApiResponse({ type: [Document] })
  async getDocuments(@Query() dto: BatchDocumentQueryDto) {
    return this.documentService.getManyAndCount(dto);
  }
}
