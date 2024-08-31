import dotenv from 'dotenv';
import express, { Response } from 'express';
import logger from './logger';
import { AppDataSource } from './data-source';
import artistRouter from './routes/artist';

dotenv.config();
export const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded());

app.use('/api/v1/', artistRouter);

app.get('/', (_, res: Response) => {
  res.send('Initial Commit');
});

const start = async () => {
  try {
    await AppDataSource.initialize();
    logger.info('Database connected successfully');
    app.listen(port, () => logger.info(`Server is listening on port ${port}`));
  } catch (error) {
    logger.error(error);
  }
};

start();
