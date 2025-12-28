import { inject, injectable } from 'tsyringe';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { PasswordResetRepository } from '../../domain/auth/password-reset.repository';
import { UserRepository } from '../../domain/user/user.repository';
import { ValidationError } from '../errors/validation-error';
import { EmailService } from '../../infrastructure/email/email.service';

@injectable()
export class ForgotPasswordUseCase {
  constructor(
    @inject('UserRepository')
    private readonly userRepo: UserRepository,

    @inject('PasswordResetRepository')
    private readonly passwordResetRepo: PasswordResetRepository,

    @inject('EmailService')
    private readonly emailService: EmailService,
  ) {}

  async execute(email: string) {
    const user = await this.userRepo.findCredentialByEmail(email);
    if (!user) {
      return;
    }

    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

    await this.passwordResetRepo.create({
      tokenHash,
      userId: user.id,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000),
    });

    const link = `${process.env.FRONTEND_URL}/reset-password?token=${rawToken}`;

    await this.emailService.sendResetPassword(user.email, link);
  }
}
