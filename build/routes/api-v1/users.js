"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _usersController = _interopRequireDefault(require("../../controllers/usersController"));

var _celebrate3 = require("celebrate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var router = (0, _express.Router)();
router.post('/register', (0, _celebrate3.celebrate)(_defineProperty({}, _celebrate3.Segments.BODY, _celebrate3.Joi.object().keys({
  username: _celebrate3.Joi.string().max(50).min(5).required(),
  email: _celebrate3.Joi.string().max(50).required().email(),
  password: _celebrate3.Joi.string().min(8).required()
}))), _usersController["default"].registerUser);
router.post('/login', (0, _celebrate3.celebrate)(_defineProperty({}, _celebrate3.Segments.BODY, _celebrate3.Joi.object().keys({
  email: _celebrate3.Joi.string().max(50).required().email(),
  password: _celebrate3.Joi.string().min(8).required()
}))), _usersController["default"].loginUser);
var _default = router;
exports["default"] = _default;