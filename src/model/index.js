const Pin = require('./Pin');
const Type = require('./Type');
const Category = require('./Category');

// Associations
Category.hasMany(Type);

Type.hasMany(Pin);
Type.belongsTo(Category);

Pin.belongsTo(Type);

module.exports = {Pin, Type, Category};
