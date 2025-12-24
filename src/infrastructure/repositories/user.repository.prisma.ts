import { UserRepository } from '../../domain/user/user.repository';
import { prisma } from '../database/prisma';
import { User } from '../../domain/user/user.entity';
import { injectable } from "tsyringe";

@injectable()
export class UserPrismaRepository implements UserRepository {
  async create(email: string, name: string): Promise<User> {
    return prisma.user.create({
      data: { email, name },
    });
  }

  findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }
}
