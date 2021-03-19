const {UUID, UUIDV4, ENUM, STRING} = require("sequelize");
const db = require("../db");

const Rating = db.define("rating", {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  review: {
    type: STRING,
    allowNull: true,
  },
  value: {
    type: ENUM(["1", "2", "3", "4", "5"]),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Rating;
