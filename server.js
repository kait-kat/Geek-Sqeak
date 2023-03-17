const express = require("express")
const session = require("express-session")
const SequelizeStore = require("connect-session-sequelize")(session.Store)
const path = require("path")
const handlebars = require("express-handlebars")


const app = express()
const PORT = process.env.PORT || 3001


const sequelize = require("./config/connection")


const helpers = require("./utils/helpers.js")
const hbs = handlebars.create({ helpers })
app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")


const routes = require("./controllers")


const sess = {
	secret: process.env.EXPRESS_SECRET,
	cookie: {
		maxAge: 1000 * 60 * 60 * 8, 
		httpOnly: true,
		secure: false,
		sameSite: "strict",
	},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize,
	}),
}


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
/// app.use(express.static(path.join(__dirname, "public")))
app.use(session(sess))


app.use(routes)


sequelize.sync({ force: false })
	.then( () => app.listen( PORT, () => console.log(`Listening at http://localhost:${PORT}! 🚀`) ) )