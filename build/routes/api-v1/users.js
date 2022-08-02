Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _express = require('express');

const _usersController = _interopRequireDefault(
  require('../../controllers/usersController')
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const router = (0, _express.Router)();
router.post('/register', _usersController.default.registerUser);
router.post('/login', _usersController.default.loginUser);
const _default = router;
exports.default = _default;
