"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var questionsSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    min: 10
  },
  description: {
    type: String,
    max: 2000
  },
  userId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  },
  preferedAnswer: String,
  dateCreated: {
    type: Date,
    "default": Date.now(),
    immutable: true
  },
  dateUpdated: {
    type: Date,
    "default": Date.now()
  }
});
questionsSchema.index({
  title: 'text'
});
var _default = questionsSchema;
exports["default"] = _default;