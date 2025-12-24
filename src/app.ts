import './config/container';
import express from 'express';
import './infrastructure/auth/passport';
import userRoutes from './interfaces/http/routes/user.route';
import authRoutes from './interfaces/http/routes/auth.route';
import { errorMiddleware } from './interfaces/http/middlewares/error.middleware';
import { requestLogger } from './interfaces/http/middlewares/request-logger.middleware';
import passport from 'passport';

const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use(requestLogger);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

// GLOBAL ERROR MIDDLEWARE
app.use(errorMiddleware);

export default app;
