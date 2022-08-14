"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var answersSchema = new _mongoose["default"].Schema({
  answer: {
    type: String,
    min: 3000
  },
  questionId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Question'
  },
  comments: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  userId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  },
  downvotes: [String],
  upvotes: [String],
  dateUpdated: Date
});
var _default = answersSchema;
exports["default"] = _default;