"use strict";

var _app = _interopRequireDefault(require("./app"));

var _database = _interopRequireDefault(require("./db/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _database["default"])();

var _ref = process.env || 3000,
    PORT = _ref.PORT;

_app["default"].listen(PORT, function () {
  console.log("Connecting on port ".concat(PORT, " ..."));
});