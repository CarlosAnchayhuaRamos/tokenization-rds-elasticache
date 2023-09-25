import { DataSource } from 'typeorm';
import { Tokens } from '../model/entities/token.entity';
import dotenv from 'dotenv';
dotenv.config();

export const myDataSource = new DataSource({
  type: 'postgres',
  host: 'database-3.chzoewnvixcm.us-east-1.rds.amazonaws.com',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'datababase1',
  entities: [Tokens],
  logging: true,
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
});
