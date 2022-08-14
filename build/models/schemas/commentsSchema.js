"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var commentsSchema = new _mongoose["default"].Schema({
  answerId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Answer'
  },
  comment: {
    type: String,
    max: 1000
  },
  userId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  },
  dateUpdated: {
    type: Date,
    "default": Date.now()
  }
});
var _default = commentsSchema;
exports["default"] = _default;