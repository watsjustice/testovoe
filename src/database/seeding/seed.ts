import configuration from '../../configuration/configuration';
import { DataSourceOptions, DataSource } from 'typeorm';
import { SeederOptions, runSeeders } from 'typeorm-extension';
import { DocumentFactory } from '../factories/document.factory';
import MainSeeder from './main.seeder';
import { Document } from '../../services/document/entities/document.entity';

const { database } = configuration();
const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  ...database,
  entities: [Document],
  factories: [DocumentFactory],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(options);
dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});
