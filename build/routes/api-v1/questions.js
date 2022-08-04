"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _celebrate3 = require("celebrate");

var _questionsController = _interopRequireDefault(require("../../controllers/questionsController"));

var _verfiyToken = _interopRequireDefault(require("../../middleware/verfiyToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var router = (0, _express.Router)();
router.get('/', _questionsController["default"].getAllQuestions);
router.get('/:id', _questionsController["default"].getQuestion);
router.post('/', (0, _celebrate3.celebrate)(_defineProperty({}, _celebrate3.Segments.BODY, _celebrate3.Joi.object().keys({
  title: _celebrate3.Joi.string().min(10).required(),
  description: _celebrate3.Joi.string().max(2000).required()
}))), _verfiyToken["default"], _questionsController["default"].postQuestion);
router.patch('/:id', (0, _celebrate3.celebrate)(_defineProperty({}, _celebrate3.Segments.BODY, _celebrate3.Joi.object().keys({
  title: _celebrate3.Joi.string().min(10),
  description: _celebrate3.Joi.string().max(2000),
  preferedAnswer: _celebrate3.Joi.string().max(1024).allow(null).allow('')
}))), _verfiyToken["default"], _questionsController["default"].updateQuestion);
router["delete"]('/:id', _verfiyToken["default"], _questionsController["default"].deleteQuestion);
var _default = router;
exports["default"] = _default;