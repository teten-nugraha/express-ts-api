import { container } from 'tsyringe';
import { UserRepository } from '../domain/user/user.repository';
import { UserPrismaRepository } from '../infrastructure/repositories/user.repository.prisma';
import { UserUseCase } from '../application/user/user.usecase';

container.register<UserRepository>('UserRepository', {
  useClass: UserPrismaRepository,
});
container.register(UserUseCase, {
  useClass: UserUseCase,
});
