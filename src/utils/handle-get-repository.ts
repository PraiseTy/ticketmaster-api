import dotenv from 'dotenv';
import { AppDataSource } from '../data-source';
import { TestDataSource } from '../test-data-source';

dotenv.config();
import { EntityTarget, Repository } from 'typeorm';
const handleGetRepository = <T>(entity: EntityTarget<T>): Repository<T> => {
  const environment = process.env.NODE_ENV || 'development';
  return environment === 'test'
    ? TestDataSource.manager.getRepository(entity)
    : AppDataSource.manager.getRepository(entity);
};
