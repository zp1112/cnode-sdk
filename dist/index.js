'use strict';

exports.__esModule = true;
exports.BASE = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var sendRequest = exports.sendRequest = function (host) {
  var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var _ref$method = _ref.method;
  var method = _ref$method === undefined ? 'get' : _ref$method;
  var _ref$timeout = _ref.timeout;
  var timeout = _ref$timeout === undefined ? 5000 : _ref$timeout;
  var callback = arguments[3];

  if (!callback) {
    return new _promise2.default(function (resolve, reject) {
      // 重新调用当前函数
      sendRequest(host, params, { method: method, timeout: timeout }, function (err, ret) {
        return err ? reject(err) : resolve(ret);
      });
    });
  }
  var opts = {
    method: method.toUpperCase(),
    url: host,
    json: true
  };
  if (opts.method === 'GET') {
    var query = (0, _keys2.default)(params).sort().map(function (key) {
      return escaper(key) + '=' + escaper(params[key]);
    }).join('&');
    var url = opts.url + '?' + query;
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
      timeout: parseInt(timeout, 10),
      form: params
    }, function (err, res) {
      if (err) {
        return callback(err);
      }
      return callback(JSON.parse(res.body));
    });
  }
};