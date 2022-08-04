"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _users = _interopRequireDefault(require("./users"));

var _questions = _interopRequireDefault(require("./questions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routes = (0, _express.Router)();
routes.use('/users', _users["default"]);
routes.use('/questions', _questions["default"]);
var _default = routes;
exports["default"] = _default;