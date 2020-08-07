const cartRouter = require("express").Router();
const {
  models: {Cart, Product, Order},
} = require("../db");

cartRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const cart = await Cart.findAll({
      where: {
        orderId: id,
      },
    });
    const products = await Product.findAll({
      include: [
        {
          model: Order,
          where: {
            id: id,
          },
        },
      ],
    });
    res.status(200).send({cart, products});
  } catch (e) {
    res.status(500).send(e);
  }
});

cartRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const {mode, productId, quantity} = req.body;
    const cart = await Cart.findAll({
      where: {
        productId: productId,
        orderId: id,
      },
    });
    if (!cart.length) {
      await Cart.create({
        quantity,
        productId,
        orderId: id,
      });
    } else if (cart.length) {
      await Cart.update(
        {
          quantity: parseInt(quantity, 10) + cart[0].dataValues.quantity,
        },
        {
          where: {
            productId: productId,
            orderId: id,
          },
        }
      );
    }
    if (mode === "add") {
      res.status(202).send({
        message: "Successfully Added to Cart",
      });
    } else
      res.status(202).send({
        message: "Successfully Removed From Cart",
      });
  } catch (e) {
    res.status(500).send({
      message: "Error Occurred",
    });
  }
});

cartRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const {productId} = req.query;
    await Cart.destroy({
      where: {
        productId,
        orderId: id,
      },
    });
    res.status(202).send({
      message: `Removed From Cart`,
    });
  } catch (e) {
    res.status(500).send({
      message: "Error Occurred",
    });
  }
});

module.exports = cartRouter;
