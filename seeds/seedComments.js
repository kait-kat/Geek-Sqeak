const { Comment } = require('../models');

const commentdata = [
  {
    comment_text: 'I love computers',
    user_id: 4,
    post_id: 1,

  },

];


const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;