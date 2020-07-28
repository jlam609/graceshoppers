const orderRouter = require("express").Router();
const { models:{Order} } = require("../db/models/index.js");

orderRouter.get("/", async (req, res, next) => {
  const orders = await Order.findAll();
  res.send({
    orders,
  });
});

orderRouter.post("/", async (req, res) => {
  await Order.create(req.body);
  res.sendStatus(201);
});

orderRouter.get("/:id", async (req, res, next) => {
  try {
    const user = await Order.findByPK(req.params.id);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

orderRouter.delete("/:id", async (req, res, next) => {
  try {
    Order.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = orderRouter;
