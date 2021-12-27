const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../utils").database;

class RefreshToken extends Model {}

RefreshToken.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            defaultValue: Sequelize.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
        },
        token: {
            type: DataTypes.STRING,
            isNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        modelName: "refreshToken",
    }
);

module.exports = RefreshToken;
