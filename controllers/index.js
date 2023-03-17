const mainRouter = require("express").Router()


const apiRouter = require("./api")
const htmlRouter = require("./html")

mainRouter.use("/", htmlRouter)
mainRouter.use("/api", apiRouter)

module.exports = mainRouter
