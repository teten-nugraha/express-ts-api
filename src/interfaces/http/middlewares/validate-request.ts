import { ZodTypeAny, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../../../application/errors/validation-error';

export const validate =
  (schema: ZodTypeAny) => (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationError('Request validation failed', error.flatten());
      }
      next(error);
    }
  };
