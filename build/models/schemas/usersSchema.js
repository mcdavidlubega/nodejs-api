"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userSchema = new _mongoose["default"].Schema({
  username: {
    type: String,
    min: 5,
    max: 50
  },
  email: {
    type: String,
    min: 6,
    max: 50
  },
  password: {
    type: String,
    min: 6,
    max: 1024
  },
  role: {
    type: String,
    "default": 'user',
    "enum": ['admin', 'user']
  },
  dateCreated: {
    type: Date,
    "default": Date.now,
    immutable: true
  }
});
var _default = userSchema;
exports["default"] = _default;