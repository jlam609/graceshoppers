const userRouter = require("express").Router();
const {
  models: {User},
} = require("../db/models/index.js");
const bcrypt = require("bcrypt");

userRouter.put("/:id", async (req, res) => {
  const {id} = req.params;
  try {
    if (req.isAuthenticated() && req.user && req.user.id === id) {
      const {password, salt, username, image, clearance, firstName, lastName} = req.body;
      if (password) {
        const hash = bcrypt.hashSync(password, salt);
        await User.update(
          {
            ...req.body,
            password: hash,
          },
          {
            where: {
              id: id,
            },
          }
        );
      } else {
        await User.update(
          {
            username,
            image,
            clearance,
            firstName,
            lastName,
          },
          {
            where: {
              id: id,
            },
          }
        );
      }
      res.status(200).send({
        status: true,
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({
      status: false,
    });
  }
});
module.exports = userRouter;
