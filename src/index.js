const rawRequest = require('request');
const escaper = str => encodeURIComponent(str).replace(/\*/g, '%2A')
                        .replace(/'/g, '%27')
                        .replace(/\(/g, '%28')
                        .replace(/\)/g, '%29')
                        .replace(/\+/, '%2b');
const DEFAULTS = {
  accesstoken: ''
};
export class BASE {
  constructor(options) {
    BASE.options = Object.assign({}, DEFAULTS, options);
  }
}
const sendRequest = exports.sendRequest = (host, params = {}, {method = 'get', timeout = 5000} = {}, callback) => {
  if (!callback) {
    return new Promise((resolve, reject) => {
      // 重新调用当前函数
      sendRequest(host, params, {method, timeout}, (err, ret) => { return err ? reject(err) : resolve(ret);});
    });
  }
  const opts = {
    method: method.toUpperCase(),
    url: host,
    json: true
  };
  if (opts.method === 'GET') {
    const query = Object.keys(params).sort().map(key => `${escaper(key)}=${escaper(params[key])}`).join('&');
    const url = `${opts.url}?${query}`;
    rawRequest.get(url, (err, res) => {
      if (err) {
        return callback(err);
      }
      return callback(JSON.parse(res.body));
    });
  } else {
    rawRequest({
      method: method.toUpperCase(),
      url: `${opts.url}`,
      headers: [
        {
          name: 'content-type',
          value: 'application/x-www-form-urlencoded'
        }
      ],
      timeout: parseInt(timeout, 10),
      form: params
    }, (err, res) => {
      if (err) {
        return callback(err);
      }
      return callback(JSON.parse(res.body));
    });
  }
};
