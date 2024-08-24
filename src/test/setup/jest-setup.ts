import { CONTAINER_NAME, isContainerRunning, setupPostgresContainer } from './docker';

export const testDBconfig = {
  user: 'test',
  password: 'test',
  port: '5432',
  database: 'testPostgresDB'
};

const jestSetup = async () => {
  const isRunning = await isContainerRunning(CONTAINER_NAME);
  if (!isRunning) {
    await setupPostgresContainer(testDBconfig.user, testDBconfig.password, testDBconfig.port);
  }
};

export default jestSetup;
