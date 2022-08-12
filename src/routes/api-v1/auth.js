import { Router } from 'express';
import { Joi, celebrate, Segments } from 'celebrate';
import authController from '../../controllers/authController';

const router = Router();

router.post(
    '/login',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().max(50).required().email(),
            password: Joi.string().min(8).required(),
        }),
    }),
    authController.loginUser
);

export default router;
