const sequelize = require("../utils/databaseUtils");
const { Sequelize, Model, DataTypes } = require("sequelize");

class Type extends Model {}

Type.init(
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
        deletedAt: {
            type: DataTypes.DATE,
            defaultValue: null,
            isNull: true,
        },
    },
    {
        sequelize,
        modelName: "type",
    }
);

module.exports = Type;
