const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');
const answersController = require('../controllers/answers');
const verify = require('../middleware/verifyToken');

const router = express.Router();

router.post(
  '/:id/answers',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      answer: Joi.string().min(3).required(),
    }),
  }),
  verify,
  answersController.postAnswer
);

module.exports = router;
