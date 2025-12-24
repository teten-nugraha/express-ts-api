import { inject, injectable } from 'tsyringe';
import bcrypt from 'bcrypt';
import { UserRepository } from '../../domain/user/user.repository';
import { CreateUserProps } from '../../domain/user/user.public';
import { ValidationError } from '../errors/validation-error';
import { User } from '../../domain/user/user.entity';

@injectable()
export class RegisterUseCase {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: { email: string; password: string; name: string }): Promise<User> {
    const existingUser = await this.userRepository.findCredentialByEmail(input.email);
    if (existingUser) {
      throw new ValidationError('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const userData: CreateUserProps = {
      email: input.email,
      password: hashedPassword,
      name: input.name,
      role: 'USER', // default role
    };

    return this.userRepository.create(userData);
  }
}
