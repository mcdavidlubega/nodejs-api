"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _supertest = _interopRequireDefault(require("supertest"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _app = _interopRequireDefault(require("../app"));

var _usersTestData = require("./testData/usersTestData");

var _answersTestData = require("./testData/answersTestData");

var _questionsTestData = require("./testData/questionsTestData");

var _dataIds = require("./testData/dataIds");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('Question Tests', function () {
  // eslint-disable-next-line no-unused-vars
  var token;
  var id1 = _dataIds.qIds.id1;
  var aid1 = _dataIds.aIds.aid1;
  beforeAll(function (done) {
    done();
  }); // eslint-disable-next-line func-names

  beforeEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var res;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _usersTestData.createUsers)();

          case 2:
            _context.next = 4;
            return (0, _questionsTestData.createQuestions)();

          case 4:
            _context.next = 6;
            return (0, _answersTestData.createAnswers)();

          case 6:
            _context.next = 8;
            return (0, _supertest["default"])(_app["default"]).post('/api/v1/auth/login').send({
              email: 'user1@gmail.com',
              password: '12345678'
            });

          case 8:
            res = _context.sent;
            token = res.body.token;

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }))); // eslint-disable-next-line func-names

  afterEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _usersTestData.deleteUsers)();

          case 2:
            _context2.next = 4;
            return (0, _questionsTestData.deleteQuestions)();

          case 4:
            _context2.next = 6;
            return (0, _answersTestData.deleteAnswers)();

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  afterAll(function (done) {
    _mongoose["default"].connection.close();

    done();
  });
  it('should get all questions', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var res;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _supertest["default"])(_app["default"]).get('/api/v1/questions');

          case 2:
            res = _context3.sent;
            expect(res.status).toEqual(200);
            expect(res.body).toEqual(expect.arrayContaining([expect.objectContaining({
              title: 'Question One',
              description: 'This is a description of question one'
            })]));

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  it('should retun a message if there are no questions', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var res;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _questionsTestData.deleteQuestions)();

          case 2:
            _context4.next = 4;
            return (0, _supertest["default"])(_app["default"]).get('/api/v1/questions');

          case 4:
            res = _context4.sent;
            expect(res.status).toEqual(200);
            expect(res.body).toEqual({
              message: 'There are no questions'
            });

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  it('should post a question', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    var res;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _supertest["default"])(_app["default"]).post('/api/v1/questions').set({
              'auth-token': token
            }).send({
              title: 'Question One',
              description: 'This is a description of question one'
            });

          case 2:
            res = _context5.sent;
            expect(res.status).toEqual(201);
            expect(res.body).toEqual(expect.objectContaining({
              title: 'Question One',
              description: 'This is a description of question one'
            }));

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  it('should get a specific question', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
    var verifiedToken, userId, res;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            verifiedToken = _jsonwebtoken["default"].verify(token, process.env.TOKEN_SECRET);
            userId = verifiedToken.userId;
            _context6.next = 4;
            return (0, _supertest["default"])(_app["default"]).get("/api/v1/questions/".concat(id1));

          case 4:
            res = _context6.sent;
            expect(res.status).toEqual(200);
            expect(res.body.Question).toMatchObject({
              _id: id1,
              userId: userId,
              title: 'Question One',
              description: 'This is a description of question one'
            });

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
  it('should return an array of objects conatining the search term when you search', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    var res;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return (0, _supertest["default"])(_app["default"]).post('/api/v1/questions/search/').send({
              search: 'One'
            });

          case 2:
            res = _context7.sent;
            expect(res.status).toEqual(200);
            expect(res.body[0]).toMatchObject({
              _id: id1,
              title: 'Question One',
              description: 'This is a description of question one'
            });

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })));
  it('should return "No questions found" if the search doesnt match any questions', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
    var res;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return (0, _supertest["default"])(_app["default"]).post('/api/v1/questions/search/').send({
              search: 'Six'
            });

          case 2:
            res = _context8.sent;
            expect(res.status).toEqual(401);
            expect(res.body).toEqual({
              message: 'No questions found'
            });

          case 5:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  })));
  /**
   * Todo: Look into making this test more reliable
   */

  it('should return the questions with the most answers', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
    var res;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return (0, _supertest["default"])(_app["default"]).post('/api/v1/questions/top/');

          case 2:
            res = _context9.sent;
            expect(res.status).toEqual(200); // console.log(res.body);

          case 4:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  })));
  it('it should update a question if a user is logged in and is the author', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
    var res;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return (0, _supertest["default"])(_app["default"]).patch("/api/v1/questions/".concat(id1)).set({
              'auth-token': token
            }).send({
              title: 'Question 1',
              description: 'This is the descritpion of question 1',
              preferedAnswer: aid1
            });

          case 2:
            res = _context10.sent;
            expect(res.status).toEqual(201);
            expect(res.body).toMatchObject({
              title: 'Question 1',
              description: 'This is the descritpion of question 1',
              preferedAnswer: aid1
            });

          case 5:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  })));
  it('it should not update a question if the user is not logged in', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
    var res;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return (0, _supertest["default"])(_app["default"]).patch("/api/v1/questions/".concat(id1)).send({
              title: 'Question 1',
              description: 'This is the descritpion of question 1',
              preferedAnswer: aid1
            });

          case 2:
            res = _context11.sent;
            expect(res.status).toEqual(401);
            expect(res.body).toEqual({
              message: 'Access denied'
            });

          case 5:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  })));
  it('it should not update a question if the user is not', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
    var uid, otherToken, res;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            uid = new _mongoose["default"].Types.ObjectId();
            otherToken = _jsonwebtoken["default"].sign({
              userId: uid,
              role: 'user'
            }, process.env.TOKEN_SECRET);
            _context12.next = 4;
            return (0, _supertest["default"])(_app["default"]).patch("/api/v1/questions/".concat(id1)).set({
              'auth-token': otherToken
            }).send({
              title: 'Question 1',
              description: 'This is the descritpion of question 1',
              preferedAnswer: aid1
            });

          case 4:
            res = _context12.sent;
            expect(res.status).toEqual(401);
            expect(res.body).toEqual({
              message: 'Not author'
            });

          case 7:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  })));
  it('should delete a question if the user is logged in and is the author', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
    var res;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return (0, _supertest["default"])(_app["default"])["delete"]("/api/v1/questions/".concat(id1)).set({
              'auth-token': token
            });

          case 2:
            res = _context13.sent;
            expect(res.status).toEqual(200);
            expect(res.body).toEqual({
              message: 'Question deleted',
              deltedQuestion: {
                acknowledged: true,
                deletedCount: 1
              }
            });

          case 5:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  })));
  it('should not delete a question if the user is not logged in', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14() {
    var res;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return (0, _supertest["default"])(_app["default"])["delete"]("/api/v1/questions/".concat(id1));

          case 2:
            res = _context14.sent;
            expect(res.status).toEqual(401);
            expect(res.body).toEqual({
              message: 'Access denied'
            });

          case 5:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  })));
  it('should not delete a question if the user is not the author', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15() {
    var uid, otherToken, res;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            uid = new _mongoose["default"].Types.ObjectId();
            otherToken = _jsonwebtoken["default"].sign({
              userId: uid,
              role: 'user'
            }, process.env.TOKEN_SECRET);
            _context15.next = 4;
            return (0, _supertest["default"])(_app["default"])["delete"]("/api/v1/questions/".concat(id1)).set({
              'auth-token': otherToken
            });

          case 4:
            res = _context15.sent;
            expect(res.status).toEqual(401);
            expect(res.body).toEqual({
              message: 'Not author'
            });

          case 7:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  })));
});