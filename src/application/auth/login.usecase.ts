import { inject, injectable } from 'tsyringe';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../../domain/user/user.repository';
import { ValidationError } from '../errors/validation-error';

@injectable()
export class LoginUseCase {
  constructor(
    @inject('UserRepository')
    private readonly userRepo: UserRepository,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepo.findCredentialByEmail(email);
    if (!user) {
      throw new ValidationError('Invalid email or password');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new ValidationError('Invalid password');
    }

    const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    return {
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }
}
