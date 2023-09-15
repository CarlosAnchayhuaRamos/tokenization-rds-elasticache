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
  @Column()
  name: string;
  @Column()
  lastname: string;
  @Column()
  email: string;
  @Column('numeric')
  card_number: number;
  @Column()
  cvv: number;
  @Column({ name: 'expiration_year' })
  expiration_year: string;
  @Column({ name: 'expiration_month' })
  expiration_month: string;
  @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.ACTIVATED })
  status: number;
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
