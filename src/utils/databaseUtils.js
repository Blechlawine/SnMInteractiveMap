const { Sequelize } = require("sequelize");

let sequelize;

if (process.env.NODE_ENV === "production") {
    sequelize = new Sequelize(process.env.DATABASE_URL);
} else {
    sequelize = new Sequelize("test", "user", "pass", {
        dialect: "sqlite",
        storage: "./data/database.sqlite",
    });
}

module.exports = sequelize;
