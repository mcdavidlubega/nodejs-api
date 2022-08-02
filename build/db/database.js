"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MONGO_URI = process.env.MONGO_URI;

function connect() {
  // Connecting to the database
  _mongoose["default"].connect(MONGO_URI, {}).then(function () {
    console.log('Successfully connected to database');
  })["catch"](function (error) {
    console.log('database connection failed. exiting now...');
    console.error(error);
    process.exit(1);
  });
}

var _default = connect;
exports["default"] = _default;