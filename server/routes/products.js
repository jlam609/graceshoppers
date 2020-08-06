const productRouter = require("express").Router();
const {
  models: {Product},
} = require("../db/models/index.js");

productRouter.get("/", async (req, res) => {
  const products = await Product.findAll();
  res.send({
    products,
  });
});

productRouter.post("/", async (req, res) => {
  await Product.create(req.body);
  res.sendStatus(201);
});

productRouter.put("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const {quantity, productQuantity} = req.body;
    await Product.update(
      {
        quantity: +productQuantity - +quantity,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).send({
      message: "Products successfully updated!",
    });
  } catch (err) {
    res.status(500).send({message: "error updating products"});
  }
});
productRouter.delete("/:id", async (req, res, next) => {
  try {
    Product.destroy({where: {id: req.params.id}});
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = productRouter;
