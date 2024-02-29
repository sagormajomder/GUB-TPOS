import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import * as dotenv from "dotenv";
import cors from "cors";
import * as path from 'path'

import accountRoutes from './routes/account-routes';
import groupRoutes from './routes/group-routes';
import committeeRoutes from './routes/committee-routes';
import boardRoutes from './routes/board-routes';
import notificationRoutes from './routes/notification-routes';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

dotenv.config({ path: __dirname + '/.env' });

const app = express();
const PORT = process.env.PORT || 3001
app.set('trust proxy', true);
app.use(json());

// Allow requests from a specific origin (e.g., http://localhost:3000)
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, // Allow cookies and other credentials
};

app.use(cors(corsOptions))

app.use(
  cookieSession({
    signed: false,
    secure: false
  })
);

// Organize routes under /api/account
app.use('/api/account', accountRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/committees', committeeRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/notifications', notificationRoutes);

app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);
  
  res.download(filePath, filename, (err) => {
    if (err) {
      // Handle the error, e.g., send an error response
      console.error(err);
      res.status(500).send('Error downloading the file');
    }
  });
});

app.all('*', async (req, res) => {
  throw new NotFoundError('Route not found');
});

app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL must be defined');
  }

  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!!!!!!!!`);
  });
};

start();
