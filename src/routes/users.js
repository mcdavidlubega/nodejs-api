const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');
const controller = require('../controllers/users');

const router = express.Router();

router.post(
  '/register',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().min(5).max(255).required(),
      email: Joi.string().required().email(),
      password: Joi.string().min(6).max(1024).required(),
    }),
  }),
  controller.createUser
);

router.post(
  '/login',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  controller.getUser
);

module.exports = router;
