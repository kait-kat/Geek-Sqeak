const { DateTime } = require("luxon")

module.exports = {
	formatDate: (date) => {
		return date.toLocaleString("en-US", DateTime.DATETIME_MED)
	},
}