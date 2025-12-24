import { injectable } from 'tsyringe';
import { prisma } from '../database/prisma';
import { RefreshTokenRepository } from '../../domain/auth/refresh-token.repository';
import { RefreshToken } from '../../domain/auth/refresh-token.entity';

@injectable()
export class RefreshTokenPrismaRepository implements RefreshTokenRepository {
  async create(data: { token: string; userId: string; expiresAt: Date }): Promise<RefreshToken> {
    return prisma.refreshToken.create({ data });
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    return prisma.refreshToken.findUnique({ where: { token } });
  }

  async revoke(token: string): Promise<void> {
    await prisma.refreshToken.update({
      where: { token },
      data: { revoked: true },
    });
  }
}
