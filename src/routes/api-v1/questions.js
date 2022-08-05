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
            preferedAnswer: Joi.string().max(1024).empty('').default(''),
        }),
    }),
    verify,
    questionsController.updateQuestion
);

router.delete('/:id', verify, questionsController.deleteQuestion);

router.post(
    '/:id/answers',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            answer: Joi.string().required().max(3000),
        }),
    }),
    verify,
    questionsController.postAnswer
);

router.get('/:id/answers', questionsController.getAnswers);

router.patch(
    '/:id/answers/:aid',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            answer: Joi.string().max(3000),
        }),
    }),
    verify,
    questionsController.updateAnswer
);

router.delete('/:id/answers/:aid', verify, questionsController.deleteAnswer);

router.patch(
    '/:id/answers/:aid/downvote',
    verify,
    questionsController.downVote
);

router.patch('/:id/answers/:aid/upvote', verify, questionsController.upVote);

router.patch(
    '/:id/answers/:aid/resetvote',
    verify,
    questionsController.resetVote
);
export default router;
