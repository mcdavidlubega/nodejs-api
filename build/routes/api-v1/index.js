Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _express = require('express');

const _users = _interopRequireDefault(require('./users'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const routes = (0, _express.Router)();
routes.use('/users', _users.default);
const _default = routes;
exports.default = _default;
