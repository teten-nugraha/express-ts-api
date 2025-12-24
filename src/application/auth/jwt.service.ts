import jwt from 'jsonwebtoken';

export const signAccessToken = (payload: { sub: string; role: 'ADMIN' | 'USER' }) =>
  jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '15m',
  });

export const signRefreshToken = (payload: { sub: string }) =>
  jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: '7d',
  });
