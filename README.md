## cnode社区开放接口sdk

快捷方便统一。

## 安装和使用

```
npm install cnode-sdk --save
```

公共参数：

```js
const options = {
  accesstoken: 'xxxx'
}
```

ES5:

promise:

```js
var cnode = require('cnode-sdk');
var topics = new cnode.TOPICS(options);
topics.postTopics({
  title: 'test',
  tab: 'test',
  content: 'api_sdk_test'
}).then(function(res){
  // xxxx
}).catch(function(err){
  // xxx
});
```

callback:

```js
var cnode = require('cnode-sdk');
var topics = new cnode.TOPICS(options);
topics.postTopics({
  title: 'test',
  tab: 'test',
  content: 'api_sdk_test'
}, function(res){
  // xxx
})
// 带参数的接口需要自己写host
topics.getTopic({mdrender: true, host: 'topic/5433d5e4e737cbe96dcef312'}, (res) => {
  console.log(res);
});
```

ES7:

```js
import {TOPICS} from 'cnode-sdk';
const topics = new TOPICS(options);
// Within Async Func
(async() => {
  try {
    const result = await topics.postTopics({
      title: 'test',
      tab: 'test',
      content: 'api_sdk_test'
    });
    return result;
  } catch (e) {
    console.log(e);
  }
})();
```
