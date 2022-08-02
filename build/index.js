const _app = _interopRequireDefault(require('./app'));

const _database = _interopRequireDefault(require('./db/database'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

(0, _database.default)();

const _ref = process.env || 3000;
const { PORT } = _ref;

_app.default.listen(PORT, () => {
  console.log('Connecting on port '.concat(PORT, ' ...'));
});
