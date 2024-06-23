import dotenv from 'dotenv';
import express, { Response } from 'express';

dotenv.config();
const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (_, res: Response) => {
  res.send('Initial Commit');
});

const start = () => {
  app.listen(port, () => `Server is listening on port ${port}`);
};

start();
