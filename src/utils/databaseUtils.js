const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("test", "user", "pass", {
    dialect: process.env.NODE_ENV === "production" ? "postgres" : "sqlite",
    storage: process.env.NODE_ENV === "production" ? process.env.DATABASE_URL : "./data/database.sqlite",
});

module.exports = sequelize;
