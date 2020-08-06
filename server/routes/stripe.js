const stripeRouter = require("express").Router();
const dotenv = require("dotenv");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const {
  models: {Order},
} = require("../db");

dotenv.config();

stripeRouter.post("/checkout", async (req, res) => {
  try {
    const {activeOrders, token, total} = req.body;
    await Order.update(
      {
        address: token.card.address_line1,
        total,
        name: token.card.name,
        status: "pending",
      },
      {
        where: {
          id: activeOrders.id,
        },
      }
    );
    // working but decided not to make a test stripe payment each time
    // const customer = await stripe.customers.create({
    //   email: token.email,
    //   source: token.id,
    // });

    // const idempotency_key = activeOrders.id;
    // const charge = await stripe.charges.create(
    //   {
    //     amount: total * 100,
    //     currency: "usd",
    //     customer: customer.id,
    //     receipt_email: token.email,
    //     description: `Purchased the Order #${activeOrders.id}`,
    //     shipping: {
    //       name: token.card.name,
    //       address: {
    //         line1: token.card.address_line1,
    //         line2: token.card.address_line2,
    //         city: token.card.address_city,
    //         country: token.card.address_country,
    //         postal_code: token.card.address_zip,
    //       },
    //     },
    //   },
    //   {
    //     idempotency_key,
    //   }
    // );
    const status = "success";
    res.status(202).send({status});
  } catch (e) {
    const status = "failure";
    res.status(202).send({status});
  }
});

module.exports = stripeRouter;
