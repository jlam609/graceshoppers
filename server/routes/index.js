const userRouter = require("./user");
const productRouter = require("./products");
const orderRouter = require("./order");
const categoryRouter = require("./category");
const cartRouter = require("./cart");
const authRouter = require("./auth");
const stripeRouter = require("./stripe");

module.exports = {
  userRouter,
  productRouter,
  orderRouter,
  categoryRouter,
  cartRouter,
  authRouter,
  stripeRouter,
};
