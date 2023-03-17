const Sequelize = require("sequelize")
require("dotenv").config()


let sequelize
if (process.env.JAWSDB_URL) {

	sequelize = new Sequelize(process.env.JAWSDB_URL)
} else {
	sequelize = new Sequelize(
		process.env.DB_NAME,
		process.env.DB_USER,
		process.env.DB_PASS,
		{
			host: process.env.DB_HOST,
			dialect: "mysql",
		},
	)
}


sequelize
	.authenticate()
	.then( () => console.log(`Connected to the ${process.env.DB_NAME} database! ✅`) )
	.catch( err => console.error(`Unable to connect to the ${process.env.DB_NAME} database ❗️:`, err) )

module.exports = sequelize