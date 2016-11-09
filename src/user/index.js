import ACTIONS from './list';
import {BASE, sendRequest} from '../';
const API = 'https://cnodejs.org/api/v1/';
export default class USER extends BASE {
  constructor(options, acts = Object.keys(ACTIONS)) {
    super(options);
    const actions = typeof acts === 'string' ? [acts] : acts;
    actions.forEach(action => {
      this[action] = this[action.replace(/(\w)/, v => v.toLowerCase())] = async(opts, to, callback) => {
        this.params = Object.assign(BASE.options, opts);
        return sendRequest(`${API}${ACTIONS[action].action}`, this.params, {method: ACTIONS[action].method, timeout: to}, callback);
      };
    });
  }
}
