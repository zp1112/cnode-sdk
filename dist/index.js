'use strict';

exports.__esModule = true;
exports.BASE = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rawRequest = require('request');
var escaper = function escaper(str) {
  return encodeURIComponent(str).replace(/\*/g, '%2A').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\+/, '%2b');
};
var DEFAULTS = {
  accesstoken: ''
};

var BASE = exports.BASE = function BASE(options) {
  (0, _classCallCheck3.default)(this, BASE);

  BASE.options = (0, _assign2.default)({}, DEFAULTS, options);
};

var sendRequest = exports.sendRequest = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(host) {
    var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var method = arguments.length <= 2 || arguments[2] === undefined ? 'get' : arguments[2];
    var callback = arguments[3];
    var opts, query, url;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (callback) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
              // 重新调用当前函数
              sendRequest(host, params, method, function (err, ret) {
                return err ? reject(err) : resolve(ret);
              });
            }));

          case 2:
            opts = {
              method: method.toUpperCase(),
              url: host,
              json: true
            };

            if (opts.method === 'GET') {
              query = (0, _keys2.default)(params).sort().map(function (key) {
                return escaper(key) + '=' + escaper(params[key]);
              }).join('&');
              url = opts.url + '?' + query;

              rawRequest.get(url, function (err, res) {
                if (err) {
                  return callback(err);
                }
                return callback(JSON.parse(res.body));
              });
            } else {
              rawRequest({
                method: method.toUpperCase(),
                url: '' + opts.url,
                headers: [{
                  name: 'content-type',
                  value: 'application/x-www-form-urlencoded'
                }],
                form: params
              }, function (err, res) {
                if (err) {
                  return callback(err);
                }
                return callback(JSON.parse(res.body));
              });
            }

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();
var enableApis = ['topics', 'user', 'message', 'collect', 'reply'];
// let arr = {};
enableApis.forEach(function (item) {
  // arr = Object.assign(require(`./${item}`), arr);
  exports[item.toUpperCase()] = require('./' + item).default;
});
// module.exports = arr;