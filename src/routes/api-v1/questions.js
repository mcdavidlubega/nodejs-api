import { Router } from 'express';
import { Joi, celebrate, Segments } from 'celebrate';
import questionsController from '../../controllers/questionsController';
import verify from '../../middleware/verfiyToken';

const router = Router();

router.get('/', questionsController.getAllQuestions);
router.get('/:id', questionsController.getQuestion);
router.post(
    '/',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            title: Joi.string().min(10).required(),
            description: Joi.string().max(2000).required(),
        }),
    }),
    verify,
    questionsController.postQuestion
);
router.patch(
    '/:id',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            title: Joi.string().min(10),
            description: Joi.string().max(2000),
            preferedAnswer: Joi.string().max(1024).allow(null).allow(''),
        }),
    }),
    verify,
    questionsController.updateQuestion
);
router.delete('/:id', verify, questionsController.deleteQuestion);
export default router;
