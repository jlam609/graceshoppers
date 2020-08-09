const {STRING, UUID, UUIDV4, INTEGER} = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  username: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  salt: {
    type: STRING,
    allowNull: false,
  },
  clearance: {
    type: INTEGER,
    defaultValue: 1,
    validate: {
      min: 1,
      max: 5,
    },
  },
  firstName: {
    type: STRING,
  },
  lastName: {
    type: STRING,
  },
  profilePic: {
    type: STRING,
    defaultValue:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    validate: {
      isURL: true,
    },
  },
});

module.exports = User;
