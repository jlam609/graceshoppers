const userRouter = require("express").Router();
const {
  models: {User},
} = require("../db/models/index.js");

userRouter.get("/", async (req, res) => {
  const users = await User.findAll();
  res.send({
    users,
  });
});

userRouter.post("/", async (req, res) => {
  await User.create(req.body);
  res.sendStatus(201);
});

userRouter.put("/:id", async (req, res) => {
  try {
    const {id} = req.params;
  } catch (err) {
    console.error(err);
  }
});

userRouter.delete("/:id", async (req, res, next) => {
  try {
    User.destroy({where: {id: req.params.id}});
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = userRouter;
