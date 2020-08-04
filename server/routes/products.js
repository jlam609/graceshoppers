const productRouter = require("express").Router();
const Sequelize = require("sequelize");

const {
  models: {Product},
} = require("../db/models/index.js");

const {Op} = Sequelize;

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? (page - 1) * limit : 0;
  return {
    limit,
    offset,
  };
};

const getPagingData = (data, page, limit) => {
  const {count: totalProd, rows: products} = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalProd / limit);
  return {totalProd, products, totalPages, currentPage};
};

productRouter.get("/?", async (req, res, next) => {
  const {page, size} = req.query;
  console.log(req.query);
  const {limit, offset} = getPagination(page, size);
  const products = await Product.findAndCountAll({
    limit,
    offset,
    where: {},
  });
  console.log(products);
  res.send(products);
});
productRouter.get("/weapons?", async (req, res, next) => {
  const {page, size} = req.query;
  const {limit, offset} = getPagination(page, size);
  const weapons = await Product.findAndCountAll({
    limit,
    offset,
    where: {
      categoryId: 1,
    },
  });
  res.send({
    weapons,
  });
});

productRouter.get("/magic", async (req, res, next) => {
  const spells = await Product.findAll({
    where: {
      categoryId: 2,
    },
  });
  res.send({
    spells,
  });
});

productRouter.get("/items", async (req, res, next) => {
  const items = await Product.findAll({
    where: {
      categoryId: 3,
    },
  });
  res.send({
    items,
  });
});

productRouter.get("/armor", async (req, res, next) => {
  const armor = await Product.findAll({
    where: {
      categoryId: 4,
    },
  });
  res.send({
    armor,
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
    const updatedProduct = {...product, ...newData};
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
    Product.destroy({where: {id: req.params.id}});
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = productRouter;
