import { DataSource } from 'typeorm';
import configuration from '../configuration/configuration';

const { database } = configuration();
export default new DataSource({
  type: 'postgres',
  ...database,
  migrations: [__dirname + 'database/migrations/**/*{.ts,.js}'],
  synchronize: false,
}).initialize().then( async () => {
  process.exit();
})


