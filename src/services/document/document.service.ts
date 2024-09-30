import { Injectable } from '@nestjs/common';
import {
  DocumentBatchExecutionException,
  DocumentNotCreatedException,
  DocumentNotDeletedException,
  DocumentNotFoundException,
  DocumentNotUpdatedException,
} from '../../utils/exceptions/document.exception';
import { getOrThrow } from '../../utils/helpers/common.helper';
import { DocumentDto } from './dto/document.dto';
import { DocumentRepository } from './repository/document.repository';
import { BatchDocumentQueryDto } from './dto/search-document.dto';
import { Document } from './entities/document.entity';
import { DocumentPaginatedRepsonse } from './types/paginated.response';

@Injectable()
export class DocumentService {
  constructor(private readonly documentRepository: DocumentRepository) {}

  async getDocumentByIDorThrow(id: string) {
    return getOrThrow(
      async () => this.documentRepository.findOneByID(id),
      new DocumentNotFoundException(id),
    );
  }

  async create(dto: DocumentDto): Promise<Document> {
    try {
      return await this.documentRepository.createOne(dto);
    } catch {
      throw new DocumentNotCreatedException();
    }
  }

  async update(id: string, dto: DocumentDto): Promise<Document> {
    await this.getDocumentByIDorThrow(id);

    try {
      return this.documentRepository.updateOne(dto, id);
    } catch {
      throw new DocumentNotUpdatedException(id);
    }
  }

  async delete(id: string): Promise<Document> {
    await this.getDocumentByIDorThrow(id);

    try {
      return this.documentRepository.deleteOne(id);
    } catch {
      throw new DocumentNotDeletedException(id);
    }
  }

  async getManyAndCount(
    dto: BatchDocumentQueryDto,
  ): Promise<DocumentPaginatedRepsonse> {
    try {
      const result = await this.documentRepository.getMany(dto);

      const pagesCount = Math.floor(result.count / dto.limit);

      return {
        results: result.instances,
        pagesCount:
          result.count % dto.limit === 0 ? pagesCount : pagesCount + 1,
        currentPage: dto.page,
        rows: result.count,
      };
    } catch {
      throw new DocumentBatchExecutionException();
    }
  }
}
