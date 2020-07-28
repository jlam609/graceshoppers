const productRouter = require("express").Router();
const { models:{Product} } = require("../db/models/index.js");

productRouter.get("/", async (req, res, next) => {
  const products = await Product.findAll();
  res.send({
    products,
  });
});

productRouter.post("/", async (req, res) => {
  await Product.create(req.body);
  res.sendStatus(201);
});

productRouter.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPK(req.params.id);
    res.send(product);
  } catch (err) {
    next(err);
  }
});
productRouter.put("/:id", async (req, newData, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    const updatedProduct = { ...product, ...newData };
    await product.upddate(updatedProduct, {
      fields: ["name", "image", "descripton", "price"],
    });
    res.send(updatedProduct);
  } catch (err) {
    next(err);
  }
});
productRouter.delete("/:id", async (req, res, next) => {
  try {
    Product.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = productRouter;
