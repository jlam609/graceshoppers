require("./config/passport");
const express = require("express");
const passport = require("passport");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const {
  seed,
  models: {Session, User},
} = require("./db");
const {
  userRouter,
  orderRouter,
  productRouter,
  categoryRouter,
  cartRouter,
  authRouter,
} = require("./routes");

const PORT = process.env.PORT || 3000;
const app = express();
dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

const findUserBySession = (sessionId) =>
  User.findOne({
    include: [
      {
        model: Session,
        where: {
          id: sessionId,
        },
      },
    ],
  });
app.use(async (req, res, next) => {
  if (!req.cookies.session_id) {
    const session = await Session.create();
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    res.cookie("session_id", session.id, {
      path: "/",
      expires: new Date(Date.now() + oneWeek),
    });
    req.sessionId = session.id;
    next();
  } else {
    let session = await Session.findAll({
      where: {
        id: req.cookies.session_id,
      },
    });
    if (!session) {
      session = await Session.create();
      req.cookies.session_id = session.id;
    }
    req.sessionId = req.cookies.session_id;
    const user = await findUserBySession(req.sessionId);
    if (user) {
      req.user = user;
    }
    next();
  }
});
app.use(express.static(path.join(__dirname, "../assets")));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../dist")));

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/carts", cartRouter);
app.use("/api/auth", authRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});
const startServer = () =>
  new Promise(() => {
    app.listen(PORT, () => {
      console.log(`server is listening on port ${PORT}`);
    });
  });

seed(false).then(startServer);
