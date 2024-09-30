import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { DocumentRepository } from './repository/document.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './entities/document.entity';

@Module({
  controllers: [DocumentController],
  providers: [
    DocumentService,
    DocumentRepository,
  ],
  imports: [TypeOrmModule.forFeature([Document])],
  exports: [DocumentService],
})

export class DocumentModule {}
