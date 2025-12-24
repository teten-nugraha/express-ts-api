import { inject, injectable } from 'tsyringe';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../../domain/user/user.repository';
import { ValidationError } from '../errors/validation-error';
import { RefreshTokenRepository } from '../../domain/auth/refresh-token.repository';
import { signAccessToken, signRefreshToken } from './jwt.service';

@injectable()
export class LoginUseCase {
  constructor(
    @inject('UserRepository')
    private readonly userRepo: UserRepository,
    @inject('RefreshTokenRepository')
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepo.findCredentialByEmail(email);
    if (!user) {
      throw new ValidationError('Invalid email or password');
    }

    // 🔐 Access Token
    const accessToken = signAccessToken({
      sub: user.id,
      role: user.role,
    });

    // 🔁 Refresh Token
    const refreshToken = signRefreshToken({
      sub: user.id,
    });

    await this.refreshTokenRepository.create({
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
      ),
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }
}
