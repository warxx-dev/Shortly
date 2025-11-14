import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Link {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  originalLink: string;

  @Column({ unique: true, nullable: true })
  code: string;

  @Column()
  clicks: number;

  @CreateDateColumn()
  createdAt: Date;
}
