const Pin = require("./Pin");
const Type = require("./Type");
const Category = require("./Category");
const User = require("./User");
const RefreshToken = require("./RefreshToken");

// Associations
Category.hasMany(Type);

Type.hasMany(Pin);
Type.belongsTo(Category);

Pin.belongsTo(Type);

RefreshToken.belongsTo(User);

module.exports = { Pin, Type, Category, User, RefreshToken };
