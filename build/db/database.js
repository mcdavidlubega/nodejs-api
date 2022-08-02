Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _mongoose = _interopRequireDefault(require('mongoose'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const { MONGO_URI } = process.env;

function connect() {
  // Connecting to the database
  _mongoose.default
    .connect(MONGO_URI, {})
    .then(() => {
      console.log('Successfully connected to database');
    })
    .catch((error) => {
      console.log('database connection failed. exiting now...');
      console.error(error);
      process.exit(1);
    });
}

const _default = connect;
exports.default = _default;
