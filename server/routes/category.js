const categoryRouter = require("express").Router();
const { models:{Category} } = require("../db/models/index.js");

categoryRouter.get("/", async (req, res, next) => {
  const categories = await Category.findAll();
  res.send({
    categories,
  });
});

categoryRouter.post("/", async (req, res) => {
  await Category.create(req.body);
  res.sendStatus(201);
});

categoryRouter.get("/:id", async (req, res, next) => {
  try {
    const category = await Category.findByPK(req.params.id);
    res.send(category);
  } catch (err) {
    next(err);
  }
});
categoryRouter.put("/:id", async (req, newData, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);
    const updatedCategory = { ...category, ...newData };
    await category.upddate(updatedCategory, { fields: ["name"] });
    res.send(updatedCategory);
  } catch (err) {
    next(err);
  }
});
categoryRouter.delete("/:id", async (req, res, next) => {
  try {
    Category.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = categoryRouter;
