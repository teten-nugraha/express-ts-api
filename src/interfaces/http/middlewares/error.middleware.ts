import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../../application/errors/app.error';
import { errorResponse } from '../responses/response.factory';
import { logger } from "../../../infrastructure/logger/logger";

export const errorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(errorResponse(err.message, err.code, err.details));
  }

  logger.error(err);

  return res.status(500).json(errorResponse('Internal server error'));
};
