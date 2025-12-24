import { inject, injectable } from 'tsyringe';
import { UserRepository } from '../../domain/user/user.repository';
import {CreateUserProps} from "../../domain/user/user.public";

@injectable()
export class UserUseCase {
  constructor(
    @inject('UserRepository')
    private readonly userRepo: UserRepository,
  ) {}

  async createUser(data:CreateUserProps) {
    return this.userRepo.create(data);
  }

  async findAll() {
    return this.userRepo.findAll();
  }
}
