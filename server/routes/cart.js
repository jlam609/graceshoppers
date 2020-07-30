const cartRouter = require("express").Router();
const {
  models: { Cart },
} = require("../db/models");

cartRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const products = Cart.findAll({
      where: {
        orderId: id,
      },
    });
    res.status(200).send({ products });
  } catch (e) {
    res.status(500).send(e);
  }
});

cartRouter.put("/:id", async (req, res) => {
  try {
    const { productId, orderId, quantity } = req.body;
    const product = await Cart.findOne({
      where: {
        productId,
        orderId,
      },
    });
    if (!product)
      await Cart.create({
        productId,
        orderId,
      });
    product.quantity = quantity;
    await product.save();
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
    const { productId, orderId } = req.body;
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

module.exports  = cartRouter