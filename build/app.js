Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _express = _interopRequireDefault(require('express'));

const _celebrate = require('celebrate');

const _routes = _interopRequireDefault(require('./routes'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

require('dotenv').config();

const app = (0, _express.default)();
app.use(_express.default.json());
app.use(_routes.default);
app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use((req, res) =>
  res.status(404).json({
    message: 'Resource not found',
    status: false,
  })
);
app.use((0, _celebrate.errors)());
const _default = app;
exports.default = _default;
