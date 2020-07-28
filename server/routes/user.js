const userRouter = require("express").Router();
const { models:{User} } = require("../db/models/index.js");

userRouter.get("/", async (req, res, next) => {
  const users = await User.findAll();
  res.send({
    users,
  });
});

userRouter.post("/", async (req, res) => {
  await User.create(req.body);
  res.sendStatus(201);
});

userRouter.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPK(req.params.id);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

userRouter.delete("/:id", async (req, res, next) => {
  try {
    User.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = userRouter;
