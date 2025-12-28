import { container } from 'tsyringe';
import { UserRepository } from '../domain/user/user.repository';
import { UserPrismaRepository } from '../infrastructure/repositories/user.repository.prisma';
import { UserUseCase } from '../application/user/user.usecase';
import { LoginUseCase } from '../application/auth/login.usecase';
import { RegisterUseCase } from '../application/auth/register.usecase';
import { RefreshTokenUseCase } from '../application/auth/refresh-token.usecase';
import { RefreshTokenRepository } from '../domain/auth/refresh-token.repository';
import { RefreshTokenPrismaRepository } from '../infrastructure/repositories/refresh-token.repository.prisma';
import { LogoutUseCase } from '../application/auth/logout.usecase';
import { EmailService } from '../infrastructure/email/email.service';
import { NodemailerEmailservice } from '../infrastructure/email/nodemailer.emailservice';
import { PasswordResetRepository } from '../domain/auth/password-reset.repository';
import { ForgotPasswordUseCase } from '../application/auth/forgot-password.usecase';
import { PasswordResetPrismaRepository } from '../infrastructure/repositories/password-reset.repository.prisma';

/// REPOSITORY
container.register<UserRepository>('UserRepository', {
  useClass: UserPrismaRepository,
});
container.register<RefreshTokenRepository>('RefreshTokenRepository', {
  useClass: RefreshTokenPrismaRepository,
});
container.register<PasswordResetRepository>('PasswordResetRepository', {
  useClass: PasswordResetPrismaRepository,
});

/// USE CASE
container.register(UserUseCase, {
  useClass: UserUseCase,
});
container.register(LoginUseCase, { useClass: LoginUseCase });
container.register(RegisterUseCase, { useClass: RegisterUseCase });
container.register(RefreshTokenUseCase, { useClass: RefreshTokenUseCase });
container.register(LogoutUseCase, { useClass: LogoutUseCase });
container.register(ForgotPasswordUseCase, { useClass: ForgotPasswordUseCase });
container.register<EmailService>('EmailService', {
  useClass: NodemailerEmailservice,
});
