const {STRING, INTEGER} = require("sequelize");
const db = require("../db");

const Category = db.define("category", {
  id: {
    primaryKey: true,
    type: INTEGER,
    autoIncrement: true,
  },
  name: {
    type: STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Category;
