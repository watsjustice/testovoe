import { GeneralConfigType } from './config.type';

export default (): GeneralConfigType => ({
  port: parseInt(process.env.PORT) || 3001,
  database: {
    database: process.env.POSTGRES_DB_NAME || 'test',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PWD || 'root',
  },
});
