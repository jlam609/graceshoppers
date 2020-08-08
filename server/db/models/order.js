const {UUID, UUIDV4, ENUM, INTEGER, STRING} = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  status: {
    type: ENUM,
    values: ["active", "pending", "completed"],
    defaultValue: "active",
  },
  total: {
    type: INTEGER,
  },
  address: {
    type: STRING,
  },
  name: {
    type: STRING,
  },
});

module.exports = Order;
