import { Router } from 'express';
import usersController from '../../controllers/usersController';

const router = Router();

router.post('/register', usersController.registerUser);
router.post('/login', usersController.loginUser);

export default router;
