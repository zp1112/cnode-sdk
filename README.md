## cnode社区开放接口sdk

快捷方便统一。

## 接口命名

TOPICS:
getTopics: get /topics 获取主题首页
getTopic: get /topic/:id 主题详情
postTopics: post /topics 新建主题
postTopicsUpdate: post /topics/update 编辑主题

USER:
getUser: get /user/:loginname 用户详情
postAccessToken: post /accesstoken 验证 accessToken 的正确性

MESSAGE:
getMessageCount: get /message/count 获取未读消息数
getMessages: get /messages 获取已读和未读消息
postMessageMarkall: post /message/mark_all 标记全部已读

COLLECT:
postCollect: post /topic_collect/collect 收藏主题
postDeCollect: post /topic_collect/de_collect 取消主题
getLoginnameCollect: get /topic_collect/:loginname 用户所收藏的主题

REPLY:
postTopicReplies: post /topic/:topic_id/replies 新建评论
postReplyUps: post /reply/:reply_id/ups 为评论点赞

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
