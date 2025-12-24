import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../responses/response.factory';

export const authorizeRoles =
  (...roles: Array<'ADMIN' | 'USER'>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as any;

    if (!roles.includes(user.role)) {
      return res.status(403).json(errorResponse('Forbidden', 'FORBIDDEN'));
    }

    next();
  };
