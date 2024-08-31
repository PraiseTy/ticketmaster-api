import { DataSource } from 'typeorm';
import { testDBconfig } from './test/setup/jest-setup';

export const TestDataSource = new DataSource({
  type: 'postgres',
  host: testDBconfig.host,
  port: Number.parseInt(testDBconfig.port, 10),
  username: testDBconfig.user,
  password: testDBconfig.password,
  database: testDBconfig.database,
  entities: ['src/entity/**/*.ts'], // Add your entities here
  synchronize: true // Set to false in production
});
