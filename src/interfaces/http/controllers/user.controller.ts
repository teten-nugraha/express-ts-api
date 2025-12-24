import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { UserUseCase } from '../../../application/user/user.usecase';
import { successResponse } from '../responses/response.factory';

@injectable()
export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  async create(req: Request, res: Response) {
    const { email, name } = req.body;
    const user = await this.userUseCase.createUser(email, name);
    res.status(201).json(successResponse(user, 'User created successfully.'));
  }

  async findAll(req: Request, res: Response) {
    const users = await this.userUseCase.findAll();
    return res.json(successResponse(users, 'Users fetched successfully'));
  }
}
