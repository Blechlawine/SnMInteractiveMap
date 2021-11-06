const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("test", "user", "pass", {
    dialect: "sqlite",
    storage: "./data/database.sqlite",
});

module.exports = sequelize;
