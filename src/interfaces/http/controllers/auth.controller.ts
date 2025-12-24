import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { LoginUseCase } from '../../../application/auth/login.usecase';
import { successResponse } from '../responses/response.factory';
import { RegisterUseCase } from '../../../application/auth/register.usecase';

@injectable()
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
  ) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await this.loginUseCase.execute(email, password);

    return res.json(successResponse(result, 'Login successful'));
  }

  async register(req: Request, res: Response) {
    const { email, password, name } = req.body;

    const user = await this.registerUseCase.execute({
      email,
      password,
      name,
    });

    // Jangan expose password
    const publicUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return res.status(201).json(successResponse(publicUser, 'User registered successfully'));
  }
}
