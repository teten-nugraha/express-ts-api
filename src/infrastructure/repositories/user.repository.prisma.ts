import { UserRepository } from '../../domain/user/user.repository';
import { prisma } from '../database/prisma';
import { User } from '../../domain/user/user.entity';
import { injectable } from 'tsyringe';
import { CreateUserProps } from '../../domain/user/user.public';

@injectable()
export class UserPrismaRepository implements UserRepository {
  async create(data: CreateUserProps): Promise<User> {
    return prisma.user.create({
      data,
    });
  }

  async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async findCredentialByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }
}
