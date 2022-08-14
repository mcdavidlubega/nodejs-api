"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _celebrate = require("celebrate");

var _database = _interopRequireDefault(require("./db/database"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _database["default"])();
var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use(_routes["default"]);
app.use(function (req, res) {
  return res.status(404).json({
    message: 'Resource not found'
  });
});
app.use((0, _celebrate.errors)());
var _default = app;
exports["default"] = _default;