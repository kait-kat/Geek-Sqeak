const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/connection")

class Post extends Model {}


Post.init(
	{
		postId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		postTitle: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		post: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		postDate: {
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
		modelName: "Post",
	},
)

module.exports = Post
