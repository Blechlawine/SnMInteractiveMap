const sequelize = require("../utils").database;
const { Sequelize, Model, DataTypes } = require("sequelize");

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            defaultValue: Sequelize.UUIDV4,
        },
        email:{
            type: DataTypes.STRING,
            required: true,
        },
        username: {
            type: DataTypes.STRING,
            required: true,
        },
        hash: {
            type: DataTypes.STRING,
            required: true,
        },
        salt: {
            type: DataTypes.STRING,
            required: true,
        },
        referenceCode: {
            type: DataTypes.STRING,
        },
        deletedAt: {
            type: DataTypes.DATE,
            defaultValue: null,
            isNull: true,
        },
    },
    {
        sequelize,
        modelName: "user",
    }
);

module.exports = User;
