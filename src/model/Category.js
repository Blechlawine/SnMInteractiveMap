const sequelize = require("../utils/databaseUtils");
const { Sequelize, Model, DataTypes } = require("sequelize");

class Category extends Model {}

Category.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            defaultValue: Sequelize.UUIDV4,
        },
        title: {
            type: DataTypes.STRING,
            isNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        status: {
            type: DataTypes.ENUM,
            defaultValue: "submitted",
            values: ["submitted", "published"],
        },
        deletedAt: {
            type: DataTypes.DATE,
            defaultValue: null,
            isNull: true,
        },
    },
    {
        sequelize,
        modelName: "category",
    }
);

module.exports = Category;
