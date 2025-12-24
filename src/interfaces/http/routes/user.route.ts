import { Router } from 'express';
import { container } from 'tsyringe';
import { UserController } from '../controllers/user.controller';

const router = Router();
const controller = container.resolve(UserController);

router.post('/', controller.create.bind(controller));
router.get('/', controller.findAll.bind(controller));

export default router;
