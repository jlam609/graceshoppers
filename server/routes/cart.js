const cartRouter = require("express").Router();
const {
  models: {Cart, Product, Order},
} = require("../db");

cartRouter.get("/:id", async (req, res) => {
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
    if (cart.length) {
      res.status(200).send({cart, products});
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

cartRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const {productId, quantity} = req.body;
    console.log(id, productId, quantity);
    const cart = await Cart.findAll({
      where: {
        productId: productId,
        orderId: id,
      },
    });
    if (!cart.length) {
      const cartItem = await Cart.create({
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
    res.status(202).send({
      message: "Successfully Added to Cart",
    });
  } catch (e) {
    res.status(500).send({
      message: "Error Occurred",
    });
  }
});

cartRouter.delete("/:id", async (req, res) => {
  try {
    const {productId, orderId} = req.body;
    await Cart.destroy({
      where: {
        productId,
        orderId,
      },
    });
    res.status(202).send({
      message: `Successfully Added to Cart `,
    });
  } catch (e) {
    res.status(500).send({
      message: "Error Occurred",
    });
  }
});

module.exports = cartRouter;
