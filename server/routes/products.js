const productRouter = require("express").Router();
const Sequelize = require("sequelize");

const {
  models: {Product},
} = require("../db/models/index.js");

const {Op} = Sequelize;

// function paginatedResults(model) {
//   return async (req, res, next) => {
//     const page = req.query.page;
//     const limit = req.query.limit;
//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;
//     const results = {};
//     if (endIndex < model.length)
//       results.next = {
//         page: page + 1,
//         limit,
//       };
//     if (startIndex > 0) {
//       results.previoius = {
//         page: page - 1,
//         limit,
//       };
//     }
//     try {
//       results.results = await model.find().limit().skip(startIndex).exec();
//       res.paginatedResults = results;
//       next();
//     } catch (e) {
//       res.status(500).json({message: e.message});
//     }
//   };
// }

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
// const paginate = (query, {page, pageSize}) => {
//   const offset = page * pageSize;
//   const limit = pageSize;
//   return {
//     ...query,
//     offset,
//     limit,
//   };
// };

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
  // const response = getPagingData(products, page, limit);
  // const response = await Product.findAll();
  res.send(products);
});
// productRouter.get("/", async (req, res, next) => {
//   const products = await Product.findAndCountAll({
//     limit,
//     offset
//   });
//   res.send({
//     products,
//   });
// });

productRouter.get("/weapons", async (req, res, next) => {
  const weapons = await Product.findAll({
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
