const bcrypt = require("bcrypt");
const passport = require("passport");
const authRouter = require("express").Router();
const {models} = require("../db");

const {Session, User} = models;

authRouter.post("/register", async (req, res) => {
  try {
    const {username, password} = req.body;
    if (username && password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      await User.create({
        username,
        password: hash,
        salt,
      });
      res.status(202).send({
        message: `user ${username} successfully created`,
      });
    }
  } catch (e) {
    res.status(500).send({
      message: ("error creating user", e),
    });
  }
});
authRouter.post("/login", passport.authenticate("local"), async function (req, res) {
  const userId = req.user.id;
  let usersSession = await Session.findByPk(req.sessionId);
  if (!usersSession) {
    usersSession = await Session.create({id: req.sessionId});
  }
  await usersSession.setUser(userId);
  res.send({
    message: `${req.user.username} found`,
  });
});
authRouter.get("/login", (req, res) => {
  try {
    if (req.user) {
      res.status(200).send({
        user: req.user,
      });
    } else {
      res.status(200).send({
        user: "",
      });
    }
  } catch (e) {
    console.error(e);
  }
});
authRouter.delete("/logout", (req, res) => {
  try {
    req.logOut();
    res.clearCookie("session_id");
    res.status(200).send({
      message: "successfully deleted",
    });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

module.exports = authRouter;
