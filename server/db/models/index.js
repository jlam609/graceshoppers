const User = require("./user");
const Product = require("./product");
const Order = require("./order");
const Category = require("./category");
const Session = require("./session");
const Cart = require("./cart");
const Rating = require("./rating");
const db = require("../db");

Product.hasMany(Rating);
User.hasMany(Rating);
User.belongsToMany(Product, {through: Rating});
User.hasMany(Session);
Session.belongsTo(User);
Product.belongsToMany(Order, {through: Cart});
Order.belongsToMany(Product, {through: Cart});
Product.belongsTo(Category);
Category.hasMany(Product);
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(Session);
Session.hasMany(Order);

module.exports = {
  db,
  models: {
    User,
    Session,
    Product,
    Order,
    Category,
    Cart,
    Rating,
  },
};
