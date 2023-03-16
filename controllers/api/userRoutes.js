const userRouter = require("express").Router()
const { User } = require("../../models")


const searchForUser = async (userId) => {
	const user = await User.findOne({
		attributes: [
			"userId",
			"displayName",
			"firstName",
			"lastName",
			"email",
		],
		where: {
			"userId": userId,
		},
	})
	if (user) {
		return user.toJSON()
	} else if (!user) {
		return null
	}
}

userRouter.post("/user", async (req, res) => {
	try {
		const newUser = await User.create(req.body)
		const user = await searchForUser(newUser.userId)
		req.session.save( () => {
			req.session.userId = newUser.userId
			req.session.signedIn = true
			res.status(200).json(user)
		})
	} catch (err) {
		res.status(500).json(err)
	}
})

userRouter.post("/user/sign-in", async (req, res) => {
	try {
		const signedOutUser = await User.findOne({ where: { email: req.body.email }})
		if (!signedOutUser) {
			res.status(401).send("Sorry, your email or password is incorrect. Try again.")
			return
		}

		const validPassword = await signedOutUser.validatePassword(req.body.password)
		if (!validPassword) {
			res.status(401).send("Sorry, your email or password is incorrect. Try again.")
			return
		} else if (validPassword) {
			const user = await searchForUser(signedOutUser.userId)
			req.session.save( () => {
				req.session.userId = signedOutUser.userId
				req.session.signedIn = true
				res.status(200).json(user)
			})
		}
	} catch (err) {
		res.status(500).json(err)
	}
})


userRouter.get("/user/:userId", async (req, res) => {
	try {
		const user = await searchForUser(req.params.userId)
		if (user) {
			res.status(200).json(user)
		} else {
			res.status(404).json(`User ${req.params.userId} not found.`)
		}
	} catch (err) {
		res.status(500).json(err)
	}
})

userRouter.patch("/user/:userId", async (req, res) => {
	try {
		await User.update(req.body, { where: { "userId": req.params.userId }, individualHooks: true })
		const user = await searchForUser(req.params.userId)
		if (user) {
			res.status(200).json(user)
		} else {
			res.status(404).json(`User ${req.params.userId} not found.`)
		}
	} catch (err) {
		res.status(500).json(err)
	}
})


userRouter.post("/user/sign-out", async (req, res) => {
	try {
		if (req.session.signedIn) {
			req.session.destroy( () => {
				res.status(204).end()
			})
		} else {
			res.status(404).end()
		}	
	} catch (err) {
		res.status(500).json(err)
	}
})

module.exports = userRouter