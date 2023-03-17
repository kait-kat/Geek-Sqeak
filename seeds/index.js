const sequelize = require("../config/connection")
const { User, Post, Comment } = require("../models")
const userData = require("./seedUser.json")
const postData = require("./seedPost.json")
const commentData = require("./seedComment.json")


async function seedDatabase() {
	await sequelize.sync({ force: true })
	await User.bulkCreate(userData, {
		individualHooks: true,
		returning: true,
	})
	await Post.bulkCreate(postData, {
		individualHooks: true,
		returning: true,
	})
	await Comment.bulkCreate(commentData, {
		individualHooks: true,
		returning: true,
	})
}

seedDatabase()