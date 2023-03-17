const apiRouter = require("express").Router()

const userRouter = require("./userRoutes")
const postRouter = require("./postRoutes")
const commentRouter = require("./commentRoutes")

apiRouter.use("/", userRouter)
apiRouter.use("/", postRouter)
apiRouter.use("/", commentRouter)

module.exports = apiRouter