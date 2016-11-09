import ACTIONS from './list';
import {BASE, sendRequest} from '../';
const API = 'https://cnodejs.org/api/v1/';
export default class REPLY extends BASE {
  constructor(options, acts = Object.keys(ACTIONS)) {
    super(options);
    const actions = typeof acts === 'string' ? [acts] : acts;
    actions.forEach(action => {
      this[action] = this[action.replace(/(\w)/, v => v.toLowerCase())] = async(opts, callback) => {
        let url = `${API}${ACTIONS[action].action}`;
        if (opts.host) {
          url = `${API}${opts.host}`;
          delete opts.host;
        }
        this.params = Object.assign({}, BASE.options, opts);
        return sendRequest(url, this.params, ACTIONS[action].method, callback);
      };
    });
  }
}
