"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// eslint-disable-next-line consistent-return, func-names
function _default(req, res, next) {
  var token = req.header('auth-token');
  if (!token) return res.status(401).send('Access denied');

  try {
    var verified = _jsonwebtoken["default"].verify(token, process.env.TOKEN_SECRET);

    req.user = verified;
    next();
  } catch (err) {
    return res.status(400).send('Invalid Token');
  }
}