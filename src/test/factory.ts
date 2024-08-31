import { Server, createServer } from 'node:http';
import express, { Response } from 'express';
import supertest from 'supertest';
import { DataSource } from 'typeorm';
import logger from '../logger';
import routes from '../routes/artist';
import { testDBconfig } from './setup/jest-setup';
import { Artist } from '../entity/artist';
import { TestDataSource } from '../test-data-source';

export class TestFactory {
  private _app: express.Application;
  private _server: Server;
  private _dataSource: DataSource;

  public get app(): supertest.SuperTest<supertest.Test> {
    return supertest(this._app) as unknown as supertest.SuperTest<supertest.Test>;
  }

  public async init(): Promise<void> {
    await this.startup();
  }

  public async close(): Promise<void> {
    if (this._dataSource.isInitialized) {
      await this._dataSource.destroy();
    }
    this._server.close();
  }

  private async startup() {
    try {
      this._dataSource = TestDataSource;
      await this._dataSource.initialize();
      this._app = express();
      this._app.use(express.json());
      this._app.use(express.urlencoded({ extended: true }));
      this._app.use('/', routes);

      this._server = createServer(this._app).listen(8000, () => {
        logger.info('Server is listening on port 8000');
      });

      logger.info('Server initialized');
    } catch (error) {
      logger.error(error);
      throw new Error(`Error starting up the server: ${error}`);
    }
  }
}
