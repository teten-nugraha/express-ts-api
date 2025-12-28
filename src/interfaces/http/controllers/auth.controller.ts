import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { LoginUseCase } from '../../../application/auth/login.usecase';
import { successResponse } from '../responses/response.factory';
import { RegisterUseCase } from '../../../application/auth/register.usecase';
import { RefreshTokenUseCase } from '../../../application/auth/refresh-token.usecase';
import { LogoutUseCase } from '../../../application/auth/logout.usecase';
import { ForgotPasswordUseCase } from '../../../application/auth/forgot-password.usecase';

@injectable()
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
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

  async refreshToken(req: Request, res: Response) {
    const { refreshToken } = req.body;

    const result = await this.refreshTokenUseCase.execute(refreshToken);

    return res.json(successResponse(result, 'Token refreshed'));
  }

  async logout(req: Request, res: Response) {
    const { refreshToken } = req.body;

    await this.logoutUseCase.execute(refreshToken);

    return res.json(successResponse(null, 'Logout successful'));
  }

  async forgotPassword(req: Request, res: Response) {
    await this.forgotPasswordUseCase.execute(req.body.email);

    return res.json(successResponse(null, 'If the email exists, a reset link has been sent'));
  }
}
