import { removePostgresContainer } from './docker';

const jestTeardown = async () => {
  await removePostgresContainer();
};

export default jestTeardown;
