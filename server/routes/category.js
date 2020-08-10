const categoryRouter = require("express").Router();
const {
  models: {Category},
} = require("../db/models/index.js");

categoryRouter.get("/", async (req, res, next) => {
  const categories = await Category.findAll();
  res.send({
    categories,
  });
});

module.exports = categoryRouter;
