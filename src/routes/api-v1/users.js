import { Router } from 'express';
import { Joi, celebrate, Segments } from 'celebrate';
import usersController from '../../controllers/usersController';
import verify from '../../middleware/verfiyToken';

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

router.delete('/delete/:id', usersController.deleteUser);

/**
 * Get User Info (Profile)
 * Todo: Add logic to controller
 */
router.get('/users/:username', (req, res) => {});

/**
 * Get All Questions Posted By A User
 */

router.get('/:id/questions', verify, usersController.getAllUserQuestions);

export default router;
