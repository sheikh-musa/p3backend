"use strict";
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
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Users", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				field: "email",
				unique: true,
				validate: {
					isEmail: true,
				},
			},
			username: {
				type: Sequelize.STRING,
				field: "username",
				unique: true,
			},
			token: {
				type: Sequelize.STRING,
				field: "token",
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
				field: "password",
			},
			board: {
				type: Sequelize.JSON,
				field: "board",
				defaultValue: boardDefault,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Users");
	},
};
