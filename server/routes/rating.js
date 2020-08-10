const ratingRouter = require("express").Router();
const {
  models: {Rating},
} = require("../db");

ratingRouter.get("/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const {count, rows} = await Rating.findAndCountAll({
      where: {
        productId: id,
      },
    });
    if (rows) {
      let avg;
      if (count) {
        const total = rows.reduce((prev, cur) => {
          prev += parseInt(cur.dataValues.value, 10);
          return prev;
        }, 0);

        avg = (total / count).toFixed(3);
      }

      res.status(200).send({
        average: avg || "No ratings yet!",
        rows,
      });
    }
  } catch (e) {
    console.log("Couldn't get ratings", e);
  }
});

ratingRouter.post("/new", async (req, res) => {
  const {rValue, id} = req.body;
  try {
    await Rating.create({
      productId: id,
      value: rValue,
    });
    res.sendStatus(201);
  } catch (e) {
    res.status(500).send({
      message: "error",
      e,
    });
  }
});

module.exports = ratingRouter;
