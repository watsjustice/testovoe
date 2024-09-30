import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateExampleTable1684059016097 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      CREATE TABLE "document" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "title" character varying(255) NOT NULL, 
        "createdAt" TIMESTAMP(6) NOT NULL DEFAULT now(), 
        "updatedAt" TIMESTAMP(6), 
        "deletedAt" TIMESTAMP(6), 
        CONSTRAINT "PK_d82726d678ebcf174c5e5a00a9d" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "document"`);
  }
}
