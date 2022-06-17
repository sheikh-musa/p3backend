const { sequelize } = require("../db");
const { Model, DataTypes } = require("sequelize");
require("validator");

class User extends Model {}

const boardDefault = {
	lanes: [
		{
			id: "Backlog",
			title: "Backlog Tasks",
			label: "",
			style: {
				width: 280,
			},
			cards: [],
		},
		{
			id: "InProgress",
			title: "Work In Progress",
			label: "",
			style: {
				width: 280,
			},
			cards: [],
		},
		{
			id: "Completed",
			title: "Completed",
			label: "",
			style: {
				width: 280,
			},
			cards: [],
		},
	],
};

User.init(
	// Column config
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			field: "email",
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		username: {
			type: DataTypes.STRING,
			field: "username",
			unique: true,
		},
		token: {
			type: DataTypes.STRING,
			field: "token",
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			field: "password",
		},
		board: {
			type: DataTypes.JSON,
			field: "board",
			defaultValue: boardDefault,
		},
		createdAt: {
			type: DataTypes.DATE,
			field: "createdAt",
		},
		updatedAt: {
			type: DataTypes.DATE,
			field: "updatedAt",
		},
		firstName: {
			type: DataTypes.STRING,
			field: "firstName",
		},
		lastName: {
			type: DataTypes.STRING,
			field: "lastName",
		},
	},
	// Model config
	{
		sequelize,
		modelName: "User",
		tableName: "Users",
	}
);

module.exports = User;
