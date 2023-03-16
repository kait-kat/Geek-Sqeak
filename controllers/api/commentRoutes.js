const commentRouter = require("express").Router()


const { Comment } = require("../../models")

const searchForComment = async (commentId) => {
	const comment = await Comment.findOne({
		where: {
			"commentId": commentId,
		},
	})
	if (comment) {
		return comment.toJSON()
	} else if (!comment) {
		return null
	}
}


commentRouter.post("/post/:postId/comment", async (req, res) => {
	try {
		const { comment, commentDate, userId } = req.body
		const postId = req.params.postId
		const newComment = await Comment.create({
			comment,
			commentDate,
			postId,
			userId,
		})
		res.status(200).json(newComment)
	} catch (err) {
		res.status(500).json(err)
	}
})


commentRouter.get("/post/:postId/comments", async (req, res) => {
	try {
		const comments = await Comment.findAll({ where: { "postId": req.params.postId } })
		comments.map(comment => comment.toJSON())
		res.status(200).json(comments)
	} catch (err) {
		res.status(500).json(err)
	}
})


commentRouter.get("/post/:postId/comment/:commentId", async (req, res) => {
	try {
		const comment = await searchForComment(req.params.commentId)
		if (comment) {
			res.status(200).json(comment)
		} else {
			res.status(404).json(`Comment ${req.params.commentId} not found.`)
		}
	} catch (err) {
		res.status(500).json(err)
	}
})

commentRouter.patch("/post/:postId/comment/:commentId", async (req, res) => {
	try {
		await Comment.update(req.body, { where: { "commentId": req.params.commentId }, individualHooks: true })
		const comment = await searchForComment(req.params.commentId)
		if (comment) {
			res.status(200).json(comment)
		} else {
			res.status(404).json(`Comment ${req.params.postId} not found.`)
		}
	} catch (err) {
		res.status(500).json(err)
	}
})


commentRouter.delete("/post/:postId/comment/:commentId", async (req, res) => {
	try {
		const comment = await searchForComment(req.params.commentId)
		if (comment) {
			await Comment.destroy({ where: { "commentId": req.params.commentId } })
			res.status(200).json(`Comment ${req.params.commentId} deleted.`)
		} else {
			res.status(404).json(`Comment ${req.params.commentId} not found.`)
		}
	} catch (err) {
		res.status(500).json(err)
	}
})

module.exports = commentRouter