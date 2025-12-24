import { container } from 'tsyringe';
import { UserRepository } from '../domain/user/user.repository';
import { UserPrismaRepository } from '../infrastructure/repositories/user.repository.prisma';
import { UserUseCase } from '../application/user/user.usecase';
import { LoginUseCase } from '../application/auth/login.usecase';
import { RegisterUseCase } from '../application/auth/register.usecase';
import { RefreshTokenUseCase } from '../application/auth/refresh-token.usecase';
import { RefreshTokenRepository } from '../domain/auth/refresh-token.repository';
import { RefreshTokenPrismaRepository } from '../infrastructure/repositories/refresh-token.repository.prisma';

/// REPOSITORY
container.register<UserRepository>('UserRepository', {
  useClass: UserPrismaRepository,
});
container.register<RefreshTokenRepository>('RefreshTokenRepository', {
  useClass: RefreshTokenPrismaRepository,
});

/// USE CASE
container.register(UserUseCase, {
  useClass: UserUseCase,
});
container.register(LoginUseCase, { useClass: LoginUseCase });
container.register(RegisterUseCase, { useClass: RegisterUseCase });
container.register(RefreshTokenUseCase, { useClass: RefreshTokenUseCase });
