import { inject, injectable } from 'tsyringe';
import jwt from 'jsonwebtoken';
import { RefreshTokenRepository } from '../../domain/auth/refresh-token.repository';
import { UserRepository } from '../../domain/user/user.repository';
import { ValidationError } from '../errors/validation-error';
import { signAccessToken, signRefreshToken } from './jwt.service';

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject('RefreshTokenRepository')
    private readonly refreshTokenRepo: RefreshTokenRepository,

    @inject('UserRepository')
    private readonly userRepo: UserRepository,
  ) {}

  async execute(refreshToken: string) {
    let payload: any;

    try {
      payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);
    } catch {
      throw new ValidationError('Invalid refresh token');
    }

    const storedToken = await this.refreshTokenRepo.findByToken(refreshToken);

    if (!storedToken || storedToken.revoked) {
      throw new ValidationError('Refresh token revoked');
    }

    if (storedToken.expiresAt < new Date()) {
      throw new ValidationError('Refresh token expired');
    }

    const user = await this.userRepo.findById(payload.sub);
    if (!user) {
      throw new ValidationError('User not found');
    }

    // 🔁 rotate refresh token
    await this.refreshTokenRepo.revoke(refreshToken);

    const newRefreshToken = signRefreshToken({ sub: user.id });
    await this.refreshTokenRepo.create({
      token: newRefreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    const accessToken = signAccessToken({
      sub: user.id,
      role: user.role,
    });

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }
}
