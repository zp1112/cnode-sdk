'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var API = 'https://cnodejs.org/api/v1/';

var COLLECT = function (_BASE) {
  (0, _inherits3.default)(COLLECT, _BASE);

  function COLLECT(options) {
    var _this2 = this;

    var acts = arguments.length <= 1 || arguments[1] === undefined ? (0, _keys2.default)(_list2.default) : arguments[1];
    (0, _classCallCheck3.default)(this, COLLECT);

    var _this = (0, _possibleConstructorReturn3.default)(this, _BASE.call(this, options));

    var actions = typeof acts === 'string' ? [acts] : acts;
    actions.forEach(function (action) {
      _this[action] = _this[action.replace(/(\w)/, function (v) {
        return v.toLowerCase();
      })] = function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(opts, callback) {
          var url;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  url = '' + API + _list2.default[action].action;

                  if (opts.host) {
                    url = '' + API + opts.host;
                    delete opts.host;
                  }
                  _this.params = (0, _assign2.default)({}, _.BASE.options, opts);
                  return _context.abrupt('return', (0, _.sendRequest)(url, _this.params, _list2.default[action].method, callback));

                case 4:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2);
        }));

        return function (_x2, _x3) {
          return _ref.apply(this, arguments);
        };
      }();
    });
    return _this;
  }

  return COLLECT;
}(_.BASE);

exports.default = COLLECT;