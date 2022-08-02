"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userSchema = new _mongoose["default"].Schema({
  userId: String,
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
  date: {
    type: Date,
    "default": Date.now
  }
});

var _default = _mongoose["default"].model('User', userSchema);

exports["default"] = _default;