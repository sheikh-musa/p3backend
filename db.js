const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("project3", "postgres", `${process.env.POSTGRES_PASSWORD}`, {
	host: "localhost",
	dialect: "postgres",
});

const testConnection = async () => {
	try {
		await sequelize.authenticate();
		return true;
	} catch (err) {
		console.log(`Couldn't connect to the database`, err);
		return false;
	}
};

module.exports = {
	testConnection,
	sequelize,
};
