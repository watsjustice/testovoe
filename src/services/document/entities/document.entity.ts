import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Document {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty()
  @CreateDateColumn({ precision: 6 })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ precision: 6, nullable: true })
  updatedAt?: Date;

  @ApiProperty()
  @DeleteDateColumn({ precision: 6, nullable: true })
  deletedAt?: Date;

  @ApiProperty()
  difference: number;
}
