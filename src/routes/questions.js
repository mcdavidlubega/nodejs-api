const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');
const controller = require('../controllers/questions');
const verify = require('../middleware/verifyToken');

const router = express.Router();

router.get('/', controller.getAllQuestions);

router.get('/:id', controller.getQuestion);

router.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().min(5).max(100).required(),
      description: Joi.string().min(5).required(),
      tag: Joi.array().items(Joi.string().min(3).required()).min(1).required(),
    }),
  }),
  verify,
  controller.postQuestion
);

router.patch(
  '/:id',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().min(5).max(100),
      description: Joi.string().min(5),
      tag: Joi.array().items(Joi.string().required()).min(1),
    }),
  }),
  controller.updateQuestion
);

router.delete('/:id', controller.deleteQuestion);

module.exports = router;
