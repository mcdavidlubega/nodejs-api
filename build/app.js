"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _celebrate = require("celebrate");

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require('dotenv').config();

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use(_routes["default"]);
app.use(function (req, res) {
  return res.status(404).json({
    message: 'Resource not found'
  });
});
app.get('/', function (req, res) {
  res.send('Hello World');
});
app.use((0, _celebrate.errors)());
var _default = app;
exports["default"] = _default;