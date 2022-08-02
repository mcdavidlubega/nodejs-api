Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _express = require('express');

const _apiV = _interopRequireDefault(require('./api-v1'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const router = (0, _express.Router)();
router.use('/api/v1', _apiV.default);
const _default = router;
exports.default = _default;
