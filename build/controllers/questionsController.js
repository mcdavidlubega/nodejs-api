"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _Questions = _interopRequireDefault(require("../models/Questions"));

var _Answers = _interopRequireDefault(require("../models/Answers"));

var _Comments = _interopRequireDefault(require("../models/Comments"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var questionsController = /*#__PURE__*/function () {
  function questionsController() {
    _classCallCheck(this, questionsController);
  }

  _createClass(questionsController, null, [{
    key: "getAllQuestions",
    value: function () {
      var _getAllQuestions = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
        var questions;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _Questions["default"].find();

              case 3:
                questions = _context.sent;

                if (!(questions.length < 1)) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", res.status(200).json({
                  message: 'There are no questions'
                }));

              case 6:
                return _context.abrupt("return", res.status(200).json(questions));

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(400).json({
                  message: _context.t0
                }));

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 9]]);
      }));

      function getAllQuestions(_x, _x2) {
        return _getAllQuestions.apply(this, arguments);
      }

      return getAllQuestions;
    }()
  }, {
    key: "searchQuestions",
    value: function () {
      var _searchQuestions = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
        var search, searchResults;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                search = req.body.search;
                _context2.next = 4;
                return _Questions["default"].find({
                  $text: {
                    $search: search
                  }
                });

              case 4:
                searchResults = _context2.sent;

                if (!(searchResults.length < 1)) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", res.status(401).json({
                  message: 'No questions found'
                }));

              case 7:
                return _context2.abrupt("return", res.status(200).json(searchResults));

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(400).json({
                  message: _context2.t0
                }));

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 10]]);
      }));

      function searchQuestions(_x3, _x4) {
        return _searchQuestions.apply(this, arguments);
      }

      return searchQuestions;
    }()
  }, {
    key: "getQuestion",
    value: function () {
      var _getQuestion = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
        var answers, question;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _Answers["default"].find({
                  questionId: req.params.id
                });

              case 2:
                answers = _context3.sent;
                _context3.prev = 3;
                _context3.next = 6;
                return _Questions["default"].findById(req.params.id);

              case 6:
                question = _context3.sent;
                return _context3.abrupt("return", res.status(200).json({
                  Question: question,
                  Answers: answers
                }));

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](3);
                return _context3.abrupt("return", res.status(400).json({
                  message: _context3.t0
                }));

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[3, 10]]);
      }));

      function getQuestion(_x5, _x6) {
        return _getQuestion.apply(this, arguments);
      }

      return getQuestion;
    }()
  }, {
    key: "getMostAnsweredQuestions",
    value: function () {
      var _getMostAnsweredQuestions = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
        var questions;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _Answers["default"].aggregate([// Grouping pipeline
                {
                  $group: {
                    _id: '$questionId',
                    answersCount: {
                      $sum: 1
                    }
                  }
                }, // Sorting pipeline
                {
                  $sort: {
                    answersCount: -1
                  }
                }, // Optionally limit results
                {
                  $limit: 5
                }]);

              case 3:
                questions = _context4.sent;
                return _context4.abrupt("return", res.status(200).json(questions));

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", res.status(400).json({
                  message: _context4.t0
                }));

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 7]]);
      }));

      function getMostAnsweredQuestions(_x7, _x8) {
        return _getMostAnsweredQuestions.apply(this, arguments);
      }

      return getMostAnsweredQuestions;
    }()
  }, {
    key: "postQuestion",
    value: function () {
      var _postQuestion = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
        var _req$body, title, description, userId, newQuestion;

        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _req$body = req.body, title = _req$body.title, description = _req$body.description;
                userId = req.user.userId;
                _context5.prev = 2;
                _context5.next = 5;
                return _Questions["default"].create({
                  title: title,
                  description: description,
                  userId: userId
                });

              case 5:
                newQuestion = _context5.sent;
                return _context5.abrupt("return", res.status(201).json(newQuestion));

              case 9:
                _context5.prev = 9;
                _context5.t0 = _context5["catch"](2);
                return _context5.abrupt("return", res.status(400).json(_context5.t0.message));

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[2, 9]]);
      }));

      function postQuestion(_x9, _x10) {
        return _postQuestion.apply(this, arguments);
      }

      return postQuestion;
    }()
  }, {
    key: "updateQuestion",
    value: function () {
      var _updateQuestion = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
        var _req$body2, title, description, dateUpdated, validatedpreferedAnswer, isAuthor, question;

        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description;
                dateUpdated = Date.now();
                validatedpreferedAnswer = _mongoose["default"].Types.ObjectId.isValid(req.body.preferedAnswer);

                if (!validatedpreferedAnswer) {
                  req.body.preferedAnswer = '';
                }

                _context6.next = 6;
                return _Questions["default"].findOne({
                  _id: req.params.id
                });

              case 6:
                isAuthor = _context6.sent;

                if (!(String(isAuthor.userId) !== req.user.userId)) {
                  _context6.next = 9;
                  break;
                }

                return _context6.abrupt("return", res.status(401).json({
                  message: 'Not author'
                }));

              case 9:
                _context6.prev = 9;
                _context6.next = 12;
                return _Questions["default"].findByIdAndUpdate(req.params.id, {
                  $set: {
                    title: title,
                    description: description,
                    dateUpdated: dateUpdated,
                    preferedAnswer: req.body.preferedAnswer
                  }
                }, {
                  "new": true
                });

              case 12:
                question = _context6.sent;
                return _context6.abrupt("return", res.status(201).json(question));

              case 16:
                _context6.prev = 16;
                _context6.t0 = _context6["catch"](9);
                return _context6.abrupt("return", res.status(400).json({
                  message: _context6.t0
                }));

              case 19:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[9, 16]]);
      }));

      function updateQuestion(_x11, _x12) {
        return _updateQuestion.apply(this, arguments);
      }

      return updateQuestion;
    }()
  }, {
    key: "deleteQuestion",
    value: function () {
      var _deleteQuestion = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
        var question, deltedQuestion;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _Questions["default"].findOne({
                  _id: req.params.id
                });

              case 2:
                question = _context7.sent;

                if (!(String(question.userId) !== req.user.userId)) {
                  _context7.next = 5;
                  break;
                }

                return _context7.abrupt("return", res.status(401).json({
                  message: 'Not author'
                }));

              case 5:
                _context7.prev = 5;
                _context7.next = 8;
                return _Questions["default"].deleteOne({
                  _id: req.params.id
                });

              case 8:
                deltedQuestion = _context7.sent;
                return _context7.abrupt("return", res.status(200).json({
                  message: 'Question deleted',
                  deltedQuestion: deltedQuestion
                }));

              case 12:
                _context7.prev = 12;
                _context7.t0 = _context7["catch"](5);
                return _context7.abrupt("return", res.status(400).json({
                  message: _context7.t0
                }));

              case 15:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[5, 12]]);
      }));

      function deleteQuestion(_x13, _x14) {
        return _deleteQuestion.apply(this, arguments);
      }

      return deleteQuestion;
    }()
  }, {
    key: "postAnswer",
    value: function () {
      var _postAnswer = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
        var question, answer, newAnswer;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return _Questions["default"].findOne({
                  _id: req.params.id
                });

              case 2:
                question = _context8.sent;
                answer = req.body.answer;
                _context8.prev = 4;
                _context8.next = 7;
                return _Answers["default"].create({
                  questionId: question._id,
                  answer: answer,
                  userId: req.user.userId
                });

              case 7:
                newAnswer = _context8.sent;
                return _context8.abrupt("return", res.status(201).json({
                  Question: question.title,
                  Answer: newAnswer
                }));

              case 11:
                _context8.prev = 11;
                _context8.t0 = _context8["catch"](4);
                return _context8.abrupt("return", res.status(401).json({
                  message: _context8.t0
                }));

              case 14:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[4, 11]]);
      }));

      function postAnswer(_x15, _x16) {
        return _postAnswer.apply(this, arguments);
      }

      return postAnswer;
    }()
  }, {
    key: "getAnswers",
    value: function () {
      var _getAnswers = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
        var answers;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _context9.next = 3;
                return _Answers["default"].find({
                  questionId: req.params.id
                });

              case 3:
                answers = _context9.sent;
                return _context9.abrupt("return", res.status(200).json({
                  answers: answers
                }));

              case 7:
                _context9.prev = 7;
                _context9.t0 = _context9["catch"](0);
                return _context9.abrupt("return", res.status(400).json({
                  message: _context9.t0
                }));

              case 10:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[0, 7]]);
      }));

      function getAnswers(_x17, _x18) {
        return _getAnswers.apply(this, arguments);
      }

      return getAnswers;
    }()
  }, {
    key: "updateAnswer",
    value: function () {
      var _updateAnswer = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
        var question, answer, newAnswer;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return _Questions["default"].findOne({
                  _id: req.params.id
                });

              case 2:
                question = _context10.sent;

                if (question) {
                  _context10.next = 5;
                  break;
                }

                return _context10.abrupt("return", res.status(400).json({
                  message: 'Question not found'
                }));

              case 5:
                _context10.next = 7;
                return _Answers["default"].findOne({
                  _id: req.params.aid
                });

              case 7:
                answer = _context10.sent;

                if (answer) {
                  _context10.next = 10;
                  break;
                }

                return _context10.abrupt("return", res.status(400).json({
                  message: 'Answer not found'
                }));

              case 10:
                if (!(String(answer.userId) !== req.user.userId)) {
                  _context10.next = 12;
                  break;
                }

                return _context10.abrupt("return", res.status(401).json({
                  message: 'Not author'
                }));

              case 12:
                _context10.prev = 12;
                _context10.next = 15;
                return _Answers["default"].findByIdAndUpdate({
                  _id: req.params.aid
                }, {
                  $set: {
                    answer: req.body.answer,
                    dateUpdated: Date.now()
                  }
                }, {
                  "new": true
                });

              case 15:
                newAnswer = _context10.sent;
                return _context10.abrupt("return", res.status(201).json(newAnswer));

              case 19:
                _context10.prev = 19;
                _context10.t0 = _context10["catch"](12);
                return _context10.abrupt("return", res.status(401).json({
                  message: _context10.t0
                }));

              case 22:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, null, [[12, 19]]);
      }));

      function updateAnswer(_x19, _x20) {
        return _updateAnswer.apply(this, arguments);
      }

      return updateAnswer;
    }()
  }, {
    key: "upVote",
    value: function () {
      var _upVote = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
        var answer, upVotes, downVotes, upVoted, downVoted, makeVote;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;
                _context11.next = 3;
                return _Answers["default"].findOne({
                  _id: req.params.aid
                });

              case 3:
                answer = _context11.sent;
                upVotes = answer.upvotes;
                downVotes = answer.downvotes;
                upVoted = upVotes.findIndex(function (vote) {
                  return vote === req.user.userId;
                });

                if (!(upVoted > -1)) {
                  _context11.next = 9;
                  break;
                }

                return _context11.abrupt("return", res.status(401).json({
                  message: 'You already voted'
                }));

              case 9:
                downVoted = downVotes.findIndex(function (vote) {
                  return vote === req.user.userId;
                });
                _context11.next = 12;
                return _Answers["default"].findById(req.params.aid);

              case 12:
                makeVote = _context11.sent;
                if (downVoted > -1) makeVote.downvotes.splice(downVoted, 1);
                makeVote.upvotes.push(req.user.userId);
                makeVote.save();
                return _context11.abrupt("return", res.status(200).json(makeVote));

              case 19:
                _context11.prev = 19;
                _context11.t0 = _context11["catch"](0);
                return _context11.abrupt("return", res.status(400).json({
                  message: _context11.t0
                }));

              case 22:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, null, [[0, 19]]);
      }));

      function upVote(_x21, _x22) {
        return _upVote.apply(this, arguments);
      }

      return upVote;
    }()
  }, {
    key: "downVote",
    value: function () {
      var _downVote = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
        var answer, upVotes, downVotes, downVoted, upVoted, makeVote;
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return _Answers["default"].findOne({
                  _id: req.params.aid
                });

              case 2:
                answer = _context12.sent;
                upVotes = answer.upvotes;
                downVotes = answer.downvotes;
                downVoted = downVotes.findIndex(function (vote) {
                  return vote === req.user.userId;
                });

                if (!(downVoted > -1)) {
                  _context12.next = 8;
                  break;
                }

                return _context12.abrupt("return", res.status(401).json({
                  message: 'You already voted'
                }));

              case 8:
                upVoted = upVotes.findIndex(function (vote) {
                  return vote === req.user.userId;
                });
                _context12.prev = 9;
                _context12.next = 12;
                return _Answers["default"].findById(req.params.aid);

              case 12:
                makeVote = _context12.sent;
                if (upVoted > -1) makeVote.upvotes.splice(upVoted, 1);
                makeVote.downvotes.push(req.user.userId);
                makeVote.save();
                return _context12.abrupt("return", res.status(200).json(makeVote));

              case 19:
                _context12.prev = 19;
                _context12.t0 = _context12["catch"](9);
                return _context12.abrupt("return", res.status(400).json({
                  message: _context12.t0
                }));

              case 22:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, null, [[9, 19]]);
      }));

      function downVote(_x23, _x24) {
        return _downVote.apply(this, arguments);
      }

      return downVote;
    }()
  }, {
    key: "resetVote",
    value: function () {
      var _resetVote = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
        var answer, upVotes, downVotes, downVoted, upVoted;
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return _Answers["default"].findOne({
                  _id: req.params.aid
                });

              case 2:
                answer = _context13.sent;

                if (answer) {
                  _context13.next = 5;
                  break;
                }

                return _context13.abrupt("return", res.status(400).json({
                  message: 'Answer not found'
                }));

              case 5:
                upVotes = answer.upvotes;
                downVotes = answer.downvotes;
                downVoted = downVotes.findIndex(function (vote) {
                  return vote === req.user.userId;
                });
                upVoted = upVotes.findIndex(function (vote) {
                  return vote === req.user.userId;
                });
                _context13.prev = 9;
                answer.upvotes.splice(upVoted, 1);
                answer.downvotes.splice(downVoted, 1);
                answer.save();
                return _context13.abrupt("return", res.status(200).json(answer));

              case 16:
                _context13.prev = 16;
                _context13.t0 = _context13["catch"](9);
                return _context13.abrupt("return", res.status(400).json({
                  message: _context13.t0
                }));

              case 19:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, null, [[9, 16]]);
      }));

      function resetVote(_x25, _x26) {
        return _resetVote.apply(this, arguments);
      }

      return resetVote;
    }()
  }, {
    key: "deleteAnswer",
    value: function () {
      var _deleteAnswer = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
        var question, answer, deletedAnswer;
        return _regeneratorRuntime().wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return _Questions["default"].findOne({
                  _id: req.params.id
                });

              case 2:
                question = _context14.sent;

                if (question) {
                  _context14.next = 5;
                  break;
                }

                return _context14.abrupt("return", res.status(400).json({
                  message: 'Question not found'
                }));

              case 5:
                _context14.next = 7;
                return _Answers["default"].findOne({
                  _id: req.params.aid
                });

              case 7:
                answer = _context14.sent;

                if (answer) {
                  _context14.next = 10;
                  break;
                }

                return _context14.abrupt("return", res.status(400).json({
                  message: 'Answer not found'
                }));

              case 10:
                if (!(String(answer.userId) !== req.user.userId)) {
                  _context14.next = 12;
                  break;
                }

                return _context14.abrupt("return", res.status(401).json({
                  message: 'Not author'
                }));

              case 12:
                _context14.prev = 12;
                _context14.next = 15;
                return _Answers["default"].deleteOne({
                  _id: req.params.aid
                });

              case 15:
                deletedAnswer = _context14.sent;
                return _context14.abrupt("return", res.status(200).json({
                  message: 'Answer Deleted ',
                  deletedAnswer: deletedAnswer
                }));

              case 19:
                _context14.prev = 19;
                _context14.t0 = _context14["catch"](12);
                return _context14.abrupt("return", res.status(400).json({
                  message: _context14.t0
                }));

              case 22:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, null, [[12, 19]]);
      }));

      function deleteAnswer(_x27, _x28) {
        return _deleteAnswer.apply(this, arguments);
      }

      return deleteAnswer;
    }()
  }, {
    key: "getComments",
    value: function () {
      var _getComments = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
        var answer, comments;
        return _regeneratorRuntime().wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.prev = 0;
                _context15.next = 3;
                return _Answers["default"].findOne({
                  _id: req.params.aid
                });

              case 3:
                answer = _context15.sent;

                if (answer) {
                  _context15.next = 6;
                  break;
                }

                return _context15.abrupt("return", res.status(200).json({
                  message: 'Answer does not exist'
                }));

              case 6:
                _context15.next = 8;
                return _Comments["default"].find({
                  answerId: req.params.aid
                });

              case 8:
                comments = _context15.sent;

                if (!(comments.length < 1)) {
                  _context15.next = 11;
                  break;
                }

                return _context15.abrupt("return", res.status(200).json({
                  message: 'Could not find any comments for this answer'
                }));

              case 11:
                return _context15.abrupt("return", res.status(200).json({
                  Answer: answer,
                  Comments: comments
                }));

              case 14:
                _context15.prev = 14;
                _context15.t0 = _context15["catch"](0);
                return _context15.abrupt("return", res.status(400).json({
                  message: _context15.t0
                }));

              case 17:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, null, [[0, 14]]);
      }));

      function getComments(_x29, _x30) {
        return _getComments.apply(this, arguments);
      }

      return getComments;
    }()
  }, {
    key: "getAComment",
    value: function () {
      var _getAComment = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {
        var answer, comment;
        return _regeneratorRuntime().wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.prev = 0;
                _context16.next = 3;
                return _Answers["default"].findOne({
                  _id: req.params.aid
                });

              case 3:
                answer = _context16.sent;

                if (answer) {
                  _context16.next = 6;
                  break;
                }

                return _context16.abrupt("return", res.status(400).json({
                  message: 'Answer does not exist'
                }));

              case 6:
                _context16.next = 8;
                return _Comments["default"].findOne({
                  _id: req.params.cid
                });

              case 8:
                comment = _context16.sent;

                if (comment) {
                  _context16.next = 11;
                  break;
                }

                return _context16.abrupt("return", res.status(400).json({
                  message: 'Comment does not exist'
                }));

              case 11:
                return _context16.abrupt("return", res.status(200).json({
                  Answer: answer.answer,
                  Comment: comment
                }));

              case 14:
                _context16.prev = 14;
                _context16.t0 = _context16["catch"](0);
                return _context16.abrupt("return", res.status(400).json({
                  message: 'Could not find comment'
                }));

              case 17:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, null, [[0, 14]]);
      }));

      function getAComment(_x31, _x32) {
        return _getAComment.apply(this, arguments);
      }

      return getAComment;
    }()
  }, {
    key: "postComment",
    value: function () {
      var _postComment = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(req, res) {
        var comment;
        return _regeneratorRuntime().wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.prev = 0;
                _context17.next = 3;
                return _Comments["default"].create({
                  answerId: req.params.aid,
                  comment: req.body.comment,
                  userId: req.user.userId
                });

              case 3:
                comment = _context17.sent;
                return _context17.abrupt("return", res.status(200).json(comment));

              case 7:
                _context17.prev = 7;
                _context17.t0 = _context17["catch"](0);
                return _context17.abrupt("return", res.status(400).json({
                  message: _context17.t0
                }));

              case 10:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, null, [[0, 7]]);
      }));

      function postComment(_x33, _x34) {
        return _postComment.apply(this, arguments);
      }

      return postComment;
    }()
  }, {
    key: "updateComment",
    value: function () {
      var _updateComment = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(req, res) {
        var author, comment;
        return _regeneratorRuntime().wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.prev = 0;
                _context18.next = 3;
                return _Comments["default"].findOne({
                  _id: req.params.cid
                });

              case 3:
                author = _context18.sent;

                if (!(String(author.userId) !== req.user.userId)) {
                  _context18.next = 6;
                  break;
                }

                return _context18.abrupt("return", res.status(401).json({
                  message: 'You are not the author'
                }));

              case 6:
                _context18.next = 8;
                return _Comments["default"].findByIdAndUpdate({
                  _id: req.params.cid
                }, {
                  $set: {
                    comment: req.body.comment
                  }
                }, {
                  "new": true
                });

              case 8:
                comment = _context18.sent;
                return _context18.abrupt("return", res.status(201).json(comment));

              case 12:
                _context18.prev = 12;
                _context18.t0 = _context18["catch"](0);
                return _context18.abrupt("return", res.status(400).json({
                  message: _context18.t0
                }));

              case 15:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, null, [[0, 12]]);
      }));

      function updateComment(_x35, _x36) {
        return _updateComment.apply(this, arguments);
      }

      return updateComment;
    }()
  }, {
    key: "deleteAComment",
    value: function () {
      var _deleteAComment = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(req, res) {
        var comment, deletedComment;
        return _regeneratorRuntime().wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.next = 2;
                return _Comments["default"].findOne({
                  _id: req.params.cid
                });

              case 2:
                comment = _context19.sent;

                if (comment) {
                  _context19.next = 5;
                  break;
                }

                return _context19.abrupt("return", res.status(400).json({
                  message: 'Comment not found'
                }));

              case 5:
                if (!(String(comment.userId) !== req.user.userId)) {
                  _context19.next = 7;
                  break;
                }

                return _context19.abrupt("return", res.status(401).json({
                  message: 'Not author'
                }));

              case 7:
                _context19.prev = 7;
                _context19.next = 10;
                return _Comments["default"].deleteOne({
                  _id: req.params.cid
                });

              case 10:
                deletedComment = _context19.sent;
                return _context19.abrupt("return", res.status(200).json({
                  message: 'Comment deleted',
                  deletedComment: deletedComment
                }));

              case 14:
                _context19.prev = 14;
                _context19.t0 = _context19["catch"](7);
                return _context19.abrupt("return", res.status(400).json({
                  message: _context19.t0
                }));

              case 17:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, null, [[7, 14]]);
      }));

      function deleteAComment(_x37, _x38) {
        return _deleteAComment.apply(this, arguments);
      }

      return deleteAComment;
    }()
  }]);

  return questionsController;
}();

var _default = questionsController;
exports["default"] = _default;