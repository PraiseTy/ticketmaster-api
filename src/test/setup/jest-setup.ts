import { CONTAINER_NAME, isContainerRunning, setupPostgresContainer } from './docker';

export const testDBconfig = {
  user: 'postgres',
  password: 'password',
  port: '5432',
  database: 'ticketmaster-api',
  host: 'localhost'
};

const jestSetup = async () => {
  const isRunning = await isContainerRunning(CONTAINER_NAME);
  if (!isRunning) {
    await setupPostgresContainer(testDBconfig.user, testDBconfig.password, testDBconfig.port);
  }
};

export default jestSetup;
