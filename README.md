## cnode社区开放接口sdk

快捷方便统一。

## 安装和使用

```
npm install ccnode --save
```

cnodejs社区api参数参考：[https://cnodejs.org/api](https://cnodejs.org/api)

公共参数：

```js
const options = {
  accesstoken: 'xxxx'
}
```

ES5:

promise使用:

```js
var cnode = require('ccnode');
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

callback使用:

```js
var cnode = require('ccnode');
var topics = new cnode.TOPICS(options);
topics.postTopics({
  title: 'test',
  tab: 'test',
  content: 'api_sdk_test'
}, function(res){
  // xxx
})
// 带参数的接口，比如/topic/:topic_id,需要自己写host
topics.getTopic({mdrender: true, host: 'topic/5433d5e4e737cbe96dcef312'}, (res) => {
  console.log(res);
});
```

ES7:

```js
import {TOPICS} from 'ccnode';
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
