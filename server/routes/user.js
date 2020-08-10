const userRouter = require("express").Router();
const {
  models: {User},
} = require("../db/models/index.js");

module.exports = userRouter;
