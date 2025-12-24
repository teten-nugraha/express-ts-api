import { Router } from 'express';
import { container } from 'tsyringe';
import { UserController } from '../controllers/user.controller';
import { validate } from '../middlewares/validate-request';
import { CreateUserSchema } from '../validators/user/create-user.dto';
import { authorizeRoles } from '../middlewares/role.middleware';
import { authenticateJwt } from '../middlewares/auth.middleware';

const router = Router();
const controller = container.resolve(UserController);

router.post('/', validate(CreateUserSchema), controller.create.bind(controller));
router.get('/', authenticateJwt, authorizeRoles('ADMIN'), controller.findAll.bind(controller));

export default router;
