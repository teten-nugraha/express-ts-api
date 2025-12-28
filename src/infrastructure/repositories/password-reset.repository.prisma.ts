import { injectable } from 'tsyringe';
import { prisma } from '../database/prisma';
import { PasswordResetRepository } from '../../domain/auth/password-reset.repository';

@injectable()
export class PasswordResetPrismaRepository implements PasswordResetRepository {
  async create(data: { tokenHash: string; userId: string; expiresAt: Date }) {
    await prisma.passwordResetToken.create({ data });
  }

  async findValid(tokenHash: string) {
    return prisma.passwordResetToken.findFirst({
      where: {
        tokenHash,
        used: false,
        expiresAt: { gt: new Date() },
      },
      select: {
        userId: true,
        expiresAt: true,
        used: true,
      },
    });
  }

  async markUsed(tokenHash: string) {
    await prisma.passwordResetToken.update({
      where: { tokenHash },
      data: { used: true },
    });
  }
}
