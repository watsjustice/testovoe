import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfigType } from '../configuration/config.type';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const dbConfig = config.get<DatabaseConfigType>('database');

        if (dbConfig.url) {
          return {
            type: 'postgres',
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
            cli: {
              migrationsDir: 'src/database/migrations',
            },
            url: dbConfig.url,
          };
        }

        return {
          type: 'postgres',
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
          cli: {
            migrationsDir: 'src/database/migrations',
          },
          ...dbConfig,
        }
      }
    })
  ]
})

export class DatabaseModule {};

