import Docker from 'dockerode';
import { imageExists, pullImageAsync } from 'dockerode-utils';
import logger from '../../logger';

const CONTAINER_IMAGE = 'postgres:13';
export const CONTAINER_NAME = 'ticketmaster-api';

export const removePostgresContainer = async () => {
  const docker = new Docker();
  try {
    const container = docker.getContainer(CONTAINER_NAME);
    const containerInfo = await container.inspect();
    if (containerInfo) {
      if (containerInfo.State.Running) {
        await container.stop();
      }
      await container.remove({ v: true });
    } // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.statusCode === 404) {
      logger.info('Container not found, skipping removal.');
    } else {
      logger.error(error);
      throw error;
    }
  }
};

export const setupPostgresContainer = async (user: string, password: string, port: string) => {
  const docker = new Docker();
  const needsToPullImage = !(await imageExists(docker, CONTAINER_IMAGE));

  if (needsToPullImage) {
    logger.info(`Pulling image ${CONTAINER_IMAGE}`);
    await pullImageAsync(docker, CONTAINER_IMAGE);
  }

  await removePostgresContainer();

  const container = await docker.createContainer({
    Env: [`POSTGRES_USER=${user}`, `POSTGRES_PASSWORD=${password}`],
    Image: CONTAINER_IMAGE,
    name: CONTAINER_NAME,
    HostConfig: {
      PortBindings: {
        '5432/tcp': [{ HostPort: port }]
      }
    },
    ExposedPorts: {
      '5432/tcp': {}
    }
  });

  await container.start();
  return container;
};

export const isContainerRunning = async (containerName: string): Promise<boolean> => {
  const docker = new Docker();
  const containers = await docker.listContainers({ all: true });
  const containerInfo = containers.find(
    (container) => container.Names && container.Names.includes(`/${containerName}`)
  );
  return containerInfo ? containerInfo.State === 'running' : false;
};
