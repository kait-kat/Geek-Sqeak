const htmlRouter = require("express").Router()

const { User, Post, Comment } = require("../../models")


htmlRouter.get("/", async (req, res) => {
	try {
		const postsRaw = await Post.findAll({
			include: [
				{
					model: User,
					as: "user",
					attributes: [
						"displayName",
						"firstName",
						"lastName",
					],
				},
			],
			order: [
				["postDate", "DESC"],
			],
		})
		const posts = postsRaw.map(post => post.toJSON())
		res.render("home", {
			posts: posts,
			userId: req.session.userId,
			signedIn: req.session.signedIn,
		})
	} catch (err) {
		res.status(500).json(err)
	}
})


htmlRouter.get("/post/:postId", async (req, res) => {
	try {
		const postRaw = await Post.findOne({
			where: {
				"postId": req.params.postId,
			},
			include: [
				{
					model: User,
					as: "user",
					attributes: [
						"displayName",
						"firstName",
						"lastName",
					],
				},
				{
					model: Comment,
					as: "comment",
					include: [
						{
							model: User,
							as: "user",
							attributes: [
								"displayName",
								"firstName",
								"lastName",
							],
						},
					],
				},
			],
		})
		const post = postRaw.toJSON()
		res.render("post", {
			post: post,
			userId: req.session.userId,
			signedIn: req.session.signedIn,
		})
	} catch (err) {
		res.status(500).json(err)
	}
})


htmlRouter.get("/sign-up", async (req, res) => {
	try {
		if (!req.session.signedIn) {
			res.render("sign-up")
		} else {
			res.redirect("/dashboard")
		}
	} catch (err) {
		res.status(500).json(err)
	}
})


htmlRouter.get("/sign-in", async (req, res) => {
	try {
		if (!req.session.signedIn) {
			res.render("sign-in")
		} else {
			res.redirect("/dashboard")
		}
	} catch (err) {
		res.status(500).json(err)
	}
})


htmlRouter.get("/dashboard", async (req, res) => {
	try {
		if (!req.session.signedIn) {
			res.render("sign-in")
		} else {
			const postsRaw = await Post.findAll({
				where: {
					"userId": req.session.userId,
				},
				order: [
					["postDate", "DESC"],
				],	
			})
			const posts = postsRaw.map(post => post.toJSON())
			res.render("dashboard", {
				posts: posts,
				userId: req.session.userId,
				signedIn: req.session.signedIn,
			})
		}
	} catch (err) {
		res.status(500).json(err)
	}
})

module.exports = htmlRouter