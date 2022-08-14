"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _celebrate7 = require("celebrate");

var _questionsController = _interopRequireDefault(require("../../controllers/questionsController"));

var _verfiyToken = _interopRequireDefault(require("../../middleware/verfiyToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var router = (0, _express.Router)();
router.get('/', _questionsController["default"].getAllQuestions);
router.get('/:id', _questionsController["default"].getQuestion);
router.post('/search/', _questionsController["default"].searchQuestions);
router.post('/top/', _questionsController["default"].getMostAnsweredQuestions);
router.post('/', (0, _celebrate7.celebrate)(_defineProperty({}, _celebrate7.Segments.BODY, _celebrate7.Joi.object().keys({
  title: _celebrate7.Joi.string().min(10).required(),
  description: _celebrate7.Joi.string().max(2000).required()
}))), _verfiyToken["default"], _questionsController["default"].postQuestion);
router.patch('/:id', (0, _celebrate7.celebrate)(_defineProperty({}, _celebrate7.Segments.BODY, _celebrate7.Joi.object().keys({
  title: _celebrate7.Joi.string().min(10),
  description: _celebrate7.Joi.string().max(2000),
  preferedAnswer: _celebrate7.Joi.string().max(1024).empty('')["default"]('')
}))), _verfiyToken["default"], _questionsController["default"].updateQuestion);
router["delete"]('/:id', _verfiyToken["default"], _questionsController["default"].deleteQuestion);
router.post('/:id/answers', (0, _celebrate7.celebrate)(_defineProperty({}, _celebrate7.Segments.BODY, _celebrate7.Joi.object().keys({
  answer: _celebrate7.Joi.string().required().max(3000)
}))), _verfiyToken["default"], _questionsController["default"].postAnswer);
router.get('/:id/answers', _questionsController["default"].getAnswers);
router.patch('/:id/answers/:aid', (0, _celebrate7.celebrate)(_defineProperty({}, _celebrate7.Segments.BODY, _celebrate7.Joi.object().keys({
  answer: _celebrate7.Joi.string().max(3000)
}))), _verfiyToken["default"], _questionsController["default"].updateAnswer);
router["delete"]('/:id/answers/:aid', _verfiyToken["default"], _questionsController["default"].deleteAnswer);
router.patch('/:id/answers/:aid/downvote', _verfiyToken["default"], _questionsController["default"].downVote);
router.patch('/:id/answers/:aid/upvote', _verfiyToken["default"], _questionsController["default"].upVote);
router.patch('/:id/answers/:aid/resetvote', _verfiyToken["default"], _questionsController["default"].resetVote);
router.get('/:id/answers/:aid/comments', _questionsController["default"].getComments);
router.post('/:id/answers/:aid/comments', (0, _celebrate7.celebrate)(_defineProperty({}, _celebrate7.Segments.BODY, _celebrate7.Joi.object().keys({
  comment: _celebrate7.Joi.string().max(100).required()
}))), _verfiyToken["default"], _questionsController["default"].postComment);
router.get('/:id/answers/:aid/comments/:cid', _questionsController["default"].getAComment);
router.patch('/:id/answers/:aid/comments/:cid', (0, _celebrate7.celebrate)(_defineProperty({}, _celebrate7.Segments.BODY, _celebrate7.Joi.object().keys({
  comment: _celebrate7.Joi.string().max(100).required()
}))), _verfiyToken["default"], _questionsController["default"].updateComment);
router["delete"]('/:id/answers/:aid/comments/:cid', _verfiyToken["default"], _questionsController["default"].deleteAComment);
var _default = router;
exports["default"] = _default;