"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _celebrate2 = require("celebrate");

var _usersController = _interopRequireDefault(require("../../controllers/usersController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var router = (0, _express.Router)();
/**
 * Register a new user
 */

router.post('/register', (0, _celebrate2.celebrate)(_defineProperty({}, _celebrate2.Segments.BODY, _celebrate2.Joi.object().keys({
  username: _celebrate2.Joi.string().max(50).min(5).required(),
  email: _celebrate2.Joi.string().max(50).required().email(),
  password: _celebrate2.Joi.string().min(8).required()
}))), _usersController["default"].registerUser);
/**
 * Delete an existing user
 */

/**
 * Get All Questions Posted By A User
 */

router.get('/:id/questions', _usersController["default"].getAllUserQuestions);
var _default = router;
exports["default"] = _default;