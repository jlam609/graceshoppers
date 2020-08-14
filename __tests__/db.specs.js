const {
  seed,
  models: {Category, Product, User, Order},
} = require("../server/db/index");

describe("DataBase", () => {

  it("Can fetch all categories", async () => {
    const categories = await Category.findAll();

    expect(categories.length).toEqual(4);
  });
  it("Can fetch all products", async () => {
    const products = await Product.findAll();
    expect(products.length).toEqual(47);
  });
  // it("Errors when creating a product with no price", async () => {
  //   try {
  //     await Product.create({
  //       name: "tennis",
  //       quantity: 10,
  //       description: "tennis",
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // });
  // it("Errors when creating a product with negative quantity", async () => {
  //   try {
  //     await Product.create({
  //       name: "tennis",
  //       quantity: -5,
  //       price: 10,
  //       description: "tennis",
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // });
});
