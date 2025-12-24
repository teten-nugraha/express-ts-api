import { Router } from 'express';
import { container } from 'tsyringe';
import { UserController } from '../controllers/user.controller';
import { validate } from '../middlewares/validate-request';
import { CreateUserSchema } from '../dtos/user/create-user.dto';

const router = Router();
const controller = container.resolve(UserController);

router.post('/', validate(CreateUserSchema), controller.create.bind(controller));
router.get('/', controller.findAll.bind(controller));

export default router;
