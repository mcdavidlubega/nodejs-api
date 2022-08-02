import { Router } from 'express';
import usersController from '../../controllers/usersController';
import { Joi, celebrate, Segments } from 'celebrate';

const router = Router();

router.post(
  '/register',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().max(50).min(5).required(),
      email: Joi.string().max(50).required().email(),
      password: Joi.string().min(8).required(),
    }),
  }),
  usersController.registerUser
);
router.post(
  '/login',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().max(50).required().email(),
      password: Joi.string().min(8).required(),
    }),
  }),
  usersController.loginUser
);

export default router;
