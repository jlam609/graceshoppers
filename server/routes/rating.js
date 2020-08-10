const ratingRouter = require("express").Router();
const {
  models: {Rating},
} = require("../db");

ratingRouter.get("/all/:itemId/:userId", async (req, res) => {
  const {itemId, userId} = req.params;
  console.log("params userId", userId);
  try {
    const {count, rows} = await Rating.findAndCountAll({
      where: {
        productId: itemId,
      },
    });
    if (rows) {
      let avg;
      let exists;
      if (count) {
        const total = rows.reduce((prev, cur) => {
          prev += parseInt(cur.dataValues.value, 10);
          console.log("data userId", cur.dataValues.userId);
          if (cur.dataValues.userId === userId) {
            exists = true;
          }
          return prev;
        }, 0);

        avg = (total / count).toFixed(3);
      }

      console.log("average", avg, "exists", exists);

      res.status(200).send({
        average: avg || "No ratings yet!",
        rows,
        exists,
      });
    }
  } catch (e) {
    console.log("Couldn't get ratings", e);
  }
});

ratingRouter.get("/average/:id", async (req, res) => {
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
      });
    }
  } catch (e) {
    console.log("Couldn't get average", e);
  }
});

ratingRouter.post("/new", async (req, res) => {
  const {rValue, itemId, userId} = req.body;
  try {
    await Rating.create({
      productId: itemId,
      userId: userId,
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
