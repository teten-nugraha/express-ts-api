import { User } from './user.entity';
import { CreateUserProps } from './user.public';

export interface UserRepository {
  create(data: CreateUserProps): Promise<User>;
  findAll(): Promise<User[]>;
  findCredentialByEmail(email: string): Promise<User | null>;
}
