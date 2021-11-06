const sequelize = require("../utils/databaseUtils");
const {
    Sequelize, Model, DataTypes
} = require("sequelize");
const Type = require("./Type");

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
    x: {
        type: DataTypes.NUMBER,
        isNull: false,
    },
    y: {
        type: DataTypes.NUMBER,
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
Pin.belongsTo(Type);

module.exports = Pin;