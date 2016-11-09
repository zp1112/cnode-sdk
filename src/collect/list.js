module.exports = {
  postCollect: {
    action: 'topic_collect/collect',
    method: 'post'
  },
  postDeCollect: {
    action: 'topic_collect/de_collect',
    method: 'post'
  },
  postLoginnameCollect: {
    action: 'topic_collect/:loginname',
    method: 'get'
  }
};
