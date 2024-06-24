import dotenv from 'dotenv';
import express, { Response } from 'express';
import logger from './logger';

dotenv.config();
const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (_, res: Response) => {
  res.send('Initial Commit');
});

const start = async () => {
  try {
    app.listen(port, () => logger.info(`Server is listening on port ${port}`));
  } catch (error) {
    logger.error(error);
  }
};

start();
