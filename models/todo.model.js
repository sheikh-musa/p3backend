const { sequelize } = require("../db");
const { Model, DataTypes } = require("sequelize");
const User = require("./user");

class TodoList extends Model {}

TodoList.init(
	// Column config
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		userId: {
			type: DataTypes.INTEGER,
			field: "user_id",
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			field: "title",
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true,
			field: "description",
		},
		progress: {
			type: DataTypes.STRING,
			allowNull: false,
			field: "progress_status",
		},
		createdAt: {
			type: DataTypes.DATE,
			field: "created_at",
		},
		updatedAt: {
			type: DataTypes.DATE,
			field: "updated_at",
		},
	},
	// Model config
	{
		sequelize,
		modelName: "TodoList",
		tableName: "todo",
	}
);

TodoList.belongsTo(User, {
	foreignKey: "email",
});

module.exports = TodoList;
