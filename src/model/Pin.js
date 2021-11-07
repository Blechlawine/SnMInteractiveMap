const sequelize = require("../utils/databaseUtils");
const {
    Sequelize, Model, DataTypes
} = require("sequelize");

class Pin extends Model {}

Pin.init({
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
    area: {
        type: DataTypes.ENUM,
        values: ["Azura", "Farmlands"],
        isNull: false,
    },
    x: {
        type: DataTypes.FLOAT,
        isNull: false,
    },
    y: {
        type: DataTypes.FLOAT,
        isNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
    },
    deletedAt: {
        type: DataTypes.DATE,
        defaultValue: null,
        isNull: true,
    },
}, {
    sequelize,
    modelName: "pin"
});

module.exports = Pin;