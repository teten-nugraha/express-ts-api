import './config/container';
import express from 'express';
import userRoutes from './interfaces/http/routes/user.route';
import { errorMiddleware } from './interfaces/http/middlewares/error.middleware';
import { requestLogger } from './interfaces/http/middlewares/request-logger.middleware';

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use('/users', userRoutes);

// GLOBAL ERROR MIDDLEWARE
app.use(errorMiddleware);

export default app;
