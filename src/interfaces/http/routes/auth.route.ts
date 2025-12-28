import { Router } from 'express';
import { container } from 'tsyringe';
import { AuthController } from '../controllers/auth.controller';
import { validate } from '../../http/middlewares/validate-request';
import { loginSchema, refreshSchema, logoutSchema } from '../validators/auth/auth.schema';
import { forgotPasswordSchema } from '../validators/auth/password-reset.schema';
import { registerSchema } from '../types/register.schema';

const router = Router();
const controller = container.resolve(AuthController);

router.post('/login', validate(loginSchema), controller.login.bind(controller));
router.post('/register', validate(registerSchema), controller.register.bind(controller));
router.post('/refresh', validate(refreshSchema), controller.refreshToken.bind(controller));
router.post('/logout', validate(logoutSchema), controller.logout.bind(controller));
router.post(
  '/forgot-password',
  validate(forgotPasswordSchema),
  controller.forgotPassword.bind(controller),
);

export default router;
