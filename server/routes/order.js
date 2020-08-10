const orderRouter = require("express").Router();
const {
  models: {Order},
} = require("../db");
const Session = require("../db/models/session");

orderRouter.get("/session", async (req, res) => {
  let order = await Order.findAll({
    where: {
      sessionId: req.sessionId,
      status: "active",
    },
  });
  if (!order.length) {
    order = await Order.create();
    order.sessionId = req.sessionId;
    await order.save();
    return res.status(201).send({
      order,
    });
  }
  return res.status(201).send({
    order,
  });
});

orderRouter.post("/", async (req, res) => {
  const {id, type} = req.body;
  try {
    if (type === "user") {
      await Order.create({
        userId: id,
      });
      res.sendStatus(201);
    } else {
      const order = await Order.create({
        sessionId: id,
      });
      res.status(201).send({
        order,
      });
    }
  } catch (e) {
    res.status(500).send({
      message: "error",
      e,
    });
  }
});

orderRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const {userId} = req.body;
  try {
    const order = await Order.update(
      {
        userId: userId,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(201).send({
      order,
    });
  } catch (e) {
    res.status(500).send({
      message: "error, e",
    });
  }
});

orderRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const orders = await Order.findAll({
      where: {
        userId: id,
      },
    });
    if (orders) {
      res.status(200).send({orders});
    }
  } catch (err) {
    console.error(err);
  }
});

orderRouter.delete("/:id", async (req, res, next) => {
  try {
    Order.destroy({where: {id: req.params.id}});
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = orderRouter;
