import dotenv from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_NAME,
  synchronize: true,
  logging: false,
  entities: [],
  migrations: [],
  subscribers: []
});
