Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _mongoose = _interopRequireDefault(require('mongoose'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const userSchema = new _mongoose.default.Schema({
  userId: {
    type: String,
    minLength: 10,
  },
  username: {
    type: String,
    maxLength: 50,
    minLength: 3,
  },
  email: {
    type: String,
    maxLength: 50,
  },
  password: {
    type: String,
    maxLength: 1024,
  },
});

const _default = _mongoose.default.model('User', userSchema);

exports.default = _default;
