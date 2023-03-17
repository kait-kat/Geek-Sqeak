const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/connection")

class Comment extends Model {}


Comment.init(
	{
		postId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		commentId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		comment: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		commentDate: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: false,
		modelName: "Comment",
	},
)

module.exports = Comment