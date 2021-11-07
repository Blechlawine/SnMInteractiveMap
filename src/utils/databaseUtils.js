const { Sequelize } = require("sequelize");

let sequelize;

if (process.env.NODE_ENV === "production") {
    sequelize = new Sequelize("snminteractivemap", "user", "pass", {
        dialect: "sqlite",
        storage: "./data/database.sqlite",
    });
} else {
    sequelize = new Sequelize("test", "user", "pass", {
        dialect: "sqlite",
        storage: "./data/database.sqlite",
    });
}

module.exports = sequelize;
