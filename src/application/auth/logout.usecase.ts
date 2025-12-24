import { inject, injectable } from 'tsyringe';
import { RefreshTokenRepository } from '../../domain/auth/refresh-token.repository';
import { ValidationError } from '../errors/validation-error';

@injectable()
export class LogoutUseCase {
  constructor(
    @inject('RefreshTokenRepository')
    private readonly refreshTokenRepo: RefreshTokenRepository,
  ) {}

  async execute(refreshToken: string): Promise<void> {
    const storedToken = await this.refreshTokenRepo.findByToken(refreshToken);

    if (!storedToken || storedToken.revoked) {
      throw new ValidationError('Invalid refresh token');
    }

    await this.refreshTokenRepo.revoke(refreshToken);
  }
}
