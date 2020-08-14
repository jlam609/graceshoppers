const supertest = require("supertest");
const {app} = require("../server/index");
const {
  models: {Product, Category, Order, User},
} = require("../server/db/index");

const superApp = supertest(app);

describe("Server", () => {
  it("Gets products correctly", async () => {
    const [count, rows] = (
      await superApp.get('/api/products/?filter=""&page=1&size=10')
    ).data;
    const products = await Product.findAll();
    expect(products.length === count).toBeTruthy();
  });
  it("Gets categories correctly", async () => {
    const categories = await superApp.get("/api/categories");

    const categoryList = await Category.findAll();
    expect(categoryList.length === categories.length);
  });
});
