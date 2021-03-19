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

productRouter.get("/all/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findByPk(id);
    res.status(201).send({product});
  } catch (e) {
    res.sendStatus(500);
    console.error(e);
  }
});
productRouter.get("/?", async (req, res) => {
  try {
    const {filter, page, size} = req.query;
    let productData;
    const {limit, offset} = getPagination(page, size);
    if (!filter.length) {
      productData = await Product.findAndCountAll({
        limit,
        offset,
        where: {},
        order: [["name", "ASC"]],
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
        order: [["name", "ASC"]],
      });
    }
    res.status(201).send(productData);
  } catch (e) {
    res.sendStatus(500);
    throw new Error("Could not send data.");
  }
});

productRouter.get("/weapons/?", async (req, res, next) => {
  try {
    const {page, size} = req.query;
    const {limit, offset} = getPagination(page, size);
    const weapons = await Product.findAndCountAll({
      limit,
      offset,
      where: {
        categoryId: 1,
      },
      order: [["name", "ASC"]],
    });
    res.send({
      weapons,
    });
  } catch (e) {
    console.log("Failed to get weapons");
    res.sendStatus(500);
  }
});

productRouter.get("/spells/?", async (req, res, next) => {
  try {
    const {page, size} = req.query;
    const {limit, offset} = getPagination(page, size);
    const spells = await Product.findAndCountAll({
      limit,
      offset,
      where: {
        categoryId: 3,
      },
      order: [["name", "ASC"]],
    });
    res.send({
      spells,
    });
  } catch (e) {
    console.log("Failed to get spells.");
    res.sendStatus(500);
  }
});

productRouter.get("/items/?", async (req, res, next) => {
  try {
    const {page, size} = req.query;
    const {limit, offset} = getPagination(page, size);
    const items = await Product.findAndCountAll({
      limit,
      offset,
      where: {
        categoryId: 4,
      },
      order: [["name", "ASC"]],
    });
    res.send({
      items,
    });
  } catch (e) {
    console.log("Failed to get items.");
    res.sendStatus(500);
  }
});

productRouter.get("/armor/?", async (req, res, next) => {
  try {
    const {page, size} = req.query;
    const {limit, offset} = getPagination(page, size);
    const armor = await Product.findAndCountAll({
      limit,
      offset,
      where: {
        categoryId: 2,
      },
      order: [["name", "ASC"]],
    });
    res.send({
      armor,
    });
  } catch (e) {
    console.log("Failed to get armor.");
    res.sendStatus(500);
  }
});

productRouter.post("/", async (req, res) => {
  try {
    await Product.create(req.body);
    res.sendStatus(201);
  } catch (e) {
    console.log("Couldn't post product.");
    res.sendStatus(500);
  }
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

module.exports = productRouter;
