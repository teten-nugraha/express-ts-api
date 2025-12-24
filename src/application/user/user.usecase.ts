import { inject, injectable } from 'tsyringe';
import { UserRepository } from '../../domain/user/user.repository';

@injectable()
export class UserUseCase {

    constructor(
        @inject("UserRepository")
        private readonly userRepo: UserRepository
    ) {}

    async createUser(email: string, password: string) {
        return this.userRepo.create(email, password);
    }

    async findAll() {
        return this.userRepo.findAll();
    }
}
