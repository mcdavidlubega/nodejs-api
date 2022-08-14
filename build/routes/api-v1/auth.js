"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _celebrate2 = require("celebrate");

var _authController = _interopRequireDefault(require("../../controllers/authController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var router = (0, _express.Router)();
router.post('/login', (0, _celebrate2.celebrate)(_defineProperty({}, _celebrate2.Segments.BODY, _celebrate2.Joi.object().keys({
  email: _celebrate2.Joi.string().max(50).required().email(),
  password: _celebrate2.Joi.string().min(8).required()
}))), _authController["default"].loginUser);
var _default = router;
exports["default"] = _default;