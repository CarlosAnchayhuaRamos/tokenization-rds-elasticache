import { DataSource } from 'typeorm';
import { Tokens } from '../model/entities/token.entity';
import dotenv from 'dotenv';
dotenv.config();

export const myDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Tokens], // Lista de entidades definido,
  logging: true,
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
});
