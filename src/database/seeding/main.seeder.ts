import { Document } from '../../services/document/entities/document.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class MainSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const documentRepo = dataSource.getRepository(Document);

    await documentRepo.query('TRUNCATE document;');

    const documentFactory = factoryManager.get(Document);

    await documentFactory.saveMany(100);
  }
}
