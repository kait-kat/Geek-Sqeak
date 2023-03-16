const postRouter = require("express").Router()
const { Post } = require("../../models")


const searchForPost = async (postId) => {
	const post = await Post.findOne({
		where: {
			"postId": postId,
		},
	})
	if (post) {
		return post.toJSON()
	} else if (!post) {
		return null
	}
}


postRouter.post("/post", async (req, res) => {
	try {
		const newPost = await Post.create(req.body)
		const post = await searchForPost(newPost.postId)
		res.status(200).json(post)
	} catch (err) {
		res.status(500).json(err)
	}
})


postRouter.get("/:userId/posts", async (req, res) => {
	try {
		const posts = await Post.findAll({ where: { "userId": req.params.userId }	})
		posts.map(post => post.toJSON())
		res.status(200).json(posts)
	} catch (err) {
		res.status(500).json(err)
	}
})


postRouter.get("/post/:postId", async (req, res) => {
	try {
		const post = await searchForPost(req.params.postId)
		if (post) {
			res.status(200).json(post)
		} else {
			res.status(404).json(`Post ${req.params.postId} not found.`)
		}
	} catch (err) {
		res.status(500).json(err)
	}
})


postRouter.patch("/post/:postId", async (req, res) => {
	try {
		await Post.update(req.body, { where: { "postId": req.params.postId }, individualHooks: true })
		const post = await searchForPost(req.params.postId)
		if (post) {
			res.status(200).json(post)
		} else {
			res.status(404).json(`Post ${req.params.postId} not found.`)
		}
	} catch (err) {
		res.status(500).json(err)
	}
})


postRouter.delete("/post/:postId", async (req, res) => {
	try {
		const post = await searchForPost(req.params.postId)
		if (post) {
			await Post.destroy({ where: { "postId": req.params.postId }	})
			res.status(200).json(`Post ${req.params.postId} deleted.`)
		} else {
			res.status(404).json(`Post ${req.params.postId} not found.`)
		}
	} catch (err) {
		res.status(500).json(err)
	}
})


postRouter.get("/posts", async (req, res) => {
	try {
		const posts = await Post.findAll()
		posts.map(post => post.toJSON())
		res.status(200).json(posts)
	} catch (err) {
		res.status(500).json(err)
	}
})

module.exports = postRouter