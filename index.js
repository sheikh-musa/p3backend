require("dotenv").config();
const app = require("./routes");
const { sequelize } = require("./db");

const PORT = process.env.PORT || 3001;
(async () => {
	await sequelize.sync({ force: true });
})();

app.listen(PORT, () => {
	console.log(`Listening to port ${PORT} ...`);
});
