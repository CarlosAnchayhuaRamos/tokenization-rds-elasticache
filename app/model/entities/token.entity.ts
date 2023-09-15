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
  @Column({ name: 'card_number' })
  cardNumber: number;
  @Column()
  cvv: number;
  @Column({ name: 'expiration_year' })
  expirationYear: string;
  @Column({ name: 'expiration_month' })
  expirationMonth: string;
  @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.ACTIVATED })
  status: number;
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
