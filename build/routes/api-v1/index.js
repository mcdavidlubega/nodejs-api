"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = _interopRequireDefault(require("./auth"));

var _questions = _interopRequireDefault(require("./questions"));

var _users = _interopRequireDefault(require("./users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routes = (0, _express.Router)();
routes.use('/auth', _auth["default"]);
routes.use('/questions', _questions["default"]);
routes.use('/users', _users["default"]);
var _default = routes;
exports["default"] = _default;