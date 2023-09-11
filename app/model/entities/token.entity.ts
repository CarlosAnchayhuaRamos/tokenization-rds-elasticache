import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StatusEnum } from '../../utils/enums/status.enum';

@Entity('tokens')
export class Tokens {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  lastname: string;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 16 })
  card_number: number;

  @Column({ length: 4 })
  cvv: number;

  @Column({ length: 4 })
  expiration_year: string;

  @Column({ length: 2 })
  expiration_month: string;

  @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.ACTIVATED })
  status: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;

}