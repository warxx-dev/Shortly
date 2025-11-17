import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
@Entity()
export class Link {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  originalLink: string;

  @Column({ unique: true, nullable: true })
  code: string;

  @Column({ default: 0 })
  clicks: number;

  @ManyToOne(() => User, (user) => user.links)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
