module.exports = {
  postTopicReplies: {
    action: 'topic/:topic_id/replies',
    method: 'post'
  },
  postReplyUps: {
    action: 'reply/:reply_id/ups',
    method: 'post'
  }
};
