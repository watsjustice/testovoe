import { Injectable } from '@nestjs/common';
import { DocumentDto } from '../dto/document.dto';
import { Repository, DataSource } from 'typeorm';
import { Document } from '../entities/document.entity';
import { BatchDocumentQueryDto } from '../dto/search-document.dto';
import { DocumentInstanceWithCountType } from '../types/instance.count.type';

@Injectable()
export class DocumentRepository extends Repository<Document> {
  constructor(private dataSource: DataSource) {
    super(Document, dataSource.createEntityManager());
  }

  async findOneByID(id: string): Promise<Document> {
    return this.createQueryBuilder()
      .select('*')
      .from(Document, 'doc')
      .addSelect(
        `ABS(DATE_PART('second', doc.updatedAt - doc.createdAt))`,
        'difference'
      )
      .where({ id: id })
      .andWhere({ deletedAt: null })
      .getRawOne()
  }

  async getMany(dto: BatchDocumentQueryDto): Promise<DocumentInstanceWithCountType> {
    const query = this.createQueryBuilder()
      .from(Document, 'doc')
      .select('*')
      .addSelect(
        `ABS(DATE_PART('second', doc.updatedAt - doc.createdAt))`,
        'difference'
      )
      .where({ deletedAt: null })
      .take(dto.limit === 0 ? null : dto.limit)
      .skip(dto.page > 1 ? (dto.page - 1) * dto.limit : 0)
      .orderBy('doc.createdAt', 'DESC');

    if (dto.title) {
      query.andWhere('LOWER(doc.title) LIKE LOWER(:title)', { title: `%${dto.title}%` });
    }

    const result = await query.getMany();

    return {
      instances: result,
      count: result.length
    }
  }

  async createOne(dto: DocumentDto): Promise<Document> {
    const result = await this.createQueryBuilder() 
          .insert()
          .into(Document)
          .values({ 
            ...dto, 
            createdAt: new Date() 
          })
          .returning('id')
          .execute()

    return <Document>result.generatedMaps[0];
  }

  async deleteOne(id: string): Promise<void> {
    await this.createQueryBuilder()
        .softDelete()
        .from(Document)
        .where({ id: id })
        .execute();
  }

  #TODO: 321321321
  async updateOne(dto: DocumentDto, id: string): Promise<void> {
    await this.createQueryBuilder()
      .update() 
      .set({ ...dto })
      .where({id: id })
      .execute()
  }
}
