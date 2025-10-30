import { IsOptional } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Link {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  originalLink: string;

  @Column({ unique: true, nullable: true })
  @IsOptional()
  code?: string;
}
