import express, { json } from 'express';
import 'dotenv/config';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/index.js';

const { PORT = 3000 } = process.env;
const BASE_URL_DB = 'mongodb://localhost:27017/bitfilmsdb';

const app = express();

app.use(helmet());
app.use(cors());
app.use(json());

async function startApp() {
  try {
    await mongoose.connect(BASE_URL_DB);
    console.log('Connection database - OK');

    app.use(router);
    app.listen(PORT, () => {
      console.log('Server is working on port', PORT);
    });
  } catch (error) {
    console.log('Error', error);
  }
}

startApp();
