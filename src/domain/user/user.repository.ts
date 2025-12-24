import { User } from './user.entity';

export interface UserRepository {
  create(email: string, password: string): Promise<User>;
  findAll(): Promise<User[]>;
}
