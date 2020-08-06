const productRouter = require("express").Router();
const Sequelize = require("sequelize");

const {
  models: {Product},
} = require("../db/models/index.js");

const {Op} = Sequelize;

const getPagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? (page - 1) * limit : 0;
  return {
    limit,
    offset,
  };
};

productRouter.get("/?", async (req, res, next) => {
  try {
    const {filter, page, size} = req.query;
    let productData;
    const {limit, offset} = getPagination(page, size);
    if (!filter.length) {
      productData = await Product.findAndCountAll({
        limit,
        offset,
        where: {},
      });
    } else {
      productData = await Product.findAndCountAll({
        limit,
        offset,
        where: {
          name: {
            [Op.iLike]: `%${filter}%`,
          },
        },
      });
    }
    res.send(productData);
  } catch (e) {
    throw new Error("Could not send data.");
  }
});

productRouter.get("/weapons/?", async (req, res, next) => {
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

productRouter.get("/spells/?", async (req, res, next) => {
  const {page, size} = req.query;
  const {limit, offset} = getPagination(page, size);
  const spells = await Product.findAndCountAll({
    limit,
    offset,
    where: {
      categoryId: 3,
    },
  });
  res.send({
    spells,
  });
});

productRouter.get("/items/?", async (req, res, next) => {
  const {page, size} = req.query;
  const {limit, offset} = getPagination(page, size);
  const items = await Product.findAndCountAll({
    limit,
    offset,
    where: {
      categoryId: 4,
    },
  });
  res.send({
    items,
  });
});

productRouter.get("/armor/?", async (req, res, next) => {
  const {page, size} = req.query;
  const {limit, offset} = getPagination(page, size);
  const armor = await Product.findAndCountAll({
    limit,
    offset,
    where: {
      categoryId: 2,
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
