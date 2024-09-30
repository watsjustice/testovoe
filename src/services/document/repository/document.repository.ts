import { Injectable } from '@nestjs/common';
import { DocumentDto } from '../dto/document.dto';
import { Repository, DataSource, Brackets } from 'typeorm';
import { Document } from '../entities/document.entity';
import { BatchDocumentQueryDto } from '../dto/search-document.dto';
import { DocumentInstanceWithCountType } from '../types/instance.count.type';

@Injectable()
export class DocumentRepository extends Repository<Document> {
  constructor(private dataSource: DataSource) {
    super(Document, dataSource.createEntityManager());
  }

  async findOneByID(id: string): Promise<Document> {
    return await this.createQueryBuilder()
      .select('*')
      .from(Document, 'doc')
      .addSelect(
        `ABS(DATE_PART('second', doc.updatedAt - doc.createdAt))`,
        'difference',
      )
      .where({ id: id })
      .getRawOne();
  }

  async getMany(
    dto: BatchDocumentQueryDto,
  ): Promise<DocumentInstanceWithCountType> {
    const result = await this.createQueryBuilder('doc')
      .select('*')
      .addSelect(
        `ABS(DATE_PART('second', doc.updatedAt - doc.createdAt))`,
        'difference',
      )
      .where(
        new Brackets((qb) => {
          if (dto.title) {
            qb.where('LOWER(doc.title) LIKE LOWER(:title)', {
              title: `%${dto.title}%`,
            });
          }
        }),
      )
      .take(dto.limit === 0 ? null : dto.limit)
      .skip(dto.page > 1 ? (dto.page - 1) * dto.limit : 0)
      .orderBy('doc.createdAt', 'DESC')
      .getRawMany();

    return {
      instances: result,
      count: result.length,
    };
  }

  async createOne(dto: DocumentDto): Promise<Document> {
    const result = await this.createQueryBuilder()
      .insert()
      .into(Document)
      .values({
        ...dto,
        createdAt: new Date(),
      })
      .returning('id')
      .execute();

    return result.generatedMaps[0] as Document;
  }

  async deleteOne(id: string): Promise<Document> {
    const result = await this.createQueryBuilder()
      .softDelete()
      .from(Document)
      .where({ id: id })
      .returning('*')
      .execute();

    return result.generatedMaps[0] as Document;
  }

  async updateOne(dto: DocumentDto, id: string): Promise<Document> {
    const result = await this.createQueryBuilder()
      .update()
      .set({ ...dto })
      .where({ id: id })
      .execute();

    return result.generatedMaps[0] as Document;
  }
}
