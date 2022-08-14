import { Router } from 'express';
import { Joi, celebrate, Segments } from 'celebrate';
import usersController from '../../controllers/usersController';

const router = Router();
/**
 * Register a new user
 */
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

/**
 * Delete an existing user
 */

/**
 * Get All Questions Posted By A User
 */

router.get('/:id/questions', usersController.getAllUserQuestions);

export default router;
