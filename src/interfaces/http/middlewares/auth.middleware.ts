import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../responses/response.factory';
import { AuthenticatedUser } from '../types/authenticated-user';

export const authenticateJwt = (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate(
    'jwt',
    { session: false },
    (err: unknown, user: AuthenticatedUser | false) => {
      if (err || !user) {
        return res.status(401).json(errorResponse('Unauthorized', 'UNAUTHORIZED'));
      }

      req.user = user;
      next();
    },
  )(req, res, next);
