import { Server, createServer } from 'node:http';
import express from 'express';
import supertest from 'supertest';
import { createConnection, Connection } from 'typeorm';
import { testDBconfig } from './setup/jest-setup';
import logger from '../logger';

// const POSTGRES_URL = `postgres://${testDBconfig.user}:
// ${testDBconfig.password}@localhost:${testDBconfig.port}/${testDBconfig.database}?authSource=admin`;
export class TestFactory {
  private _app: express.Application;
  private _connection: Connection;
  private _server: Server;

  public get app(): supertest.SuperTest<supertest.Test> {
    return supertest(this._app) as unknown as supertest.SuperTest<supertest.Test>;
  }

  public async init(): Promise<void> {
    await this.startup();
  }

  public async close(): Promise<void> {
    if (this._connection) {
      await this._connection.close();
    }
    this._server.close();
  }

  private async startup() {
    try {
      // Connect to PostgreSQL
      this._connection = await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: Number.parseInt(testDBconfig.port, 10),
        username: testDBconfig.user,
        password: testDBconfig.password,
        database: testDBconfig.database,
        entities: [],
        synchronize: true
      });

      // Setup Express app
      this._app = express();
      this._app.use(express.json());
      this._app.use(express.urlencoded({ extended: true }));
      // Add routes and middleware here
      // this._app.use('/', routes);
      // this._app.use(errorHandler);

      this._server = createServer(this._app).listen(3010);

      logger.info('Server and database initialized');
    } catch (error) {
      logger.error(error);
      throw new Error(`Error starting up the server: ${error}`);
    }
  }
}
