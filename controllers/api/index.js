const apiRouter = require("express").Router()

const userRoutes = require("/userRoutes")
const postRoutes = require("/postRoutes")
const commentRoutes = require("/commentRoutes")

apiRouter.use("/", userRoutes)
apiRouter.use("/", postRoutes)
apiRouter.use("/", commentRoutes)

module.exports = apiRouter