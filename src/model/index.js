const Pin = require("./Pin");
const Type = require("./Type");
const Category = require("./Category");
const User = require("./User");
const RefreshToken = require("./RefreshToken");

// Associations
Category.Types = Category.hasMany(Type);
Type.Category = Type.belongsTo(Category);

Type.Pins = Type.hasMany(Pin);
Pin.Type = Pin.belongsTo(Type);

RefreshToken.User = RefreshToken.belongsTo(User);

module.exports = { Pin, Type, Category, User, RefreshToken };
