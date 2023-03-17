const User = require("./User")
const Post = require("./Post")
const Comment = require("./Comment")


User.hasMany(Post, {
	as: "post",
	foreignKey: "userId",
	onDelete: "CASCADE",
})

Post.belongsTo(User, {
	as: "user",
	foreignKey: "userId",
})


User.hasMany(Comment, {
	as: "comment",
	foreignKey: "userId",
	onDelete: "CASCADE",
})

Comment.belongsTo(User, {
	as: "user",
	foreignKey: "userId",
})


Post.hasMany(Comment, {
	as: "comment",
	foreignKey: "postId",
	onDelete: "CASCADE",
})

Comment.belongsTo(Post, {
	as: "post",
	foreignKey: "postId",
})

module.exports = { User, Post, Comment }