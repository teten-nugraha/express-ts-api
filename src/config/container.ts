import { container } from 'tsyringe';
import { UserRepository } from '../domain/user/user.repository';
import { UserPrismaRepository } from '../infrastructure/repositories/user.repository.prisma';
import { UserUseCase } from '../application/user/user.usecase';
import { LoginUseCase } from '../application/auth/login.usecase';
import { RegisterUseCase } from '../application/auth/register.usecase';

container.register<UserRepository>('UserRepository', {
  useClass: UserPrismaRepository,
});
container.register(UserUseCase, {
  useClass: UserUseCase,
});
container.register(LoginUseCase, { useClass: LoginUseCase });
container.register(RegisterUseCase, { useClass: RegisterUseCase });
