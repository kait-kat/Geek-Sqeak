const mainRouter = require("express").Router()


const apiRoutes = require("./api")
const htmlRoutes = require("./html")

mainRouter.use("/", htmlRoutes)
mainRouter.use("/api", apiRoutes)

module.exports = mainRouter
