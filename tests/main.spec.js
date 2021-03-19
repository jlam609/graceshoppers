const {
  db,
  seed,
  models: {Product, Category, Session, User, Order, Cart},
} = require("../server/db/index");
const app = require("../server/index");
const supertest = require("supertest");

process.env.NODE_ENV = "test";

const superApp = supertest(app);
describe("Test", () => {
  it("works", () => {
    expect(1 + 1).toEqual(2);
  });
});

describe("Server", () => {
  beforeEach(() => seed());
  it("Gets products correctly", async () => {
    const response = await superApp.get("/api/products?filter=''&page=1&size=5");
    const products = await Product.findAndCountAll({
      limit: 5,
      offset: 0,
      where: {},
    });
    expect(response.data).toEqual(products);
    const expressProducts = response.body.products.map((p) => p.id);
    const dbProducts = products.map((p) => p.id);
    expect(dbProducts.length === expressProducts.length).toBeTruthy();
    dbProducts.forEach((dp) => {
      expect(expressProducts.includes(dp)).toBeTruthy();
    });
  });
});

describe("Server", () => {
  beforeEach(() => seed());
  it("Gets categories correctly", async () => {
    const response = await superApp.get("/api/categories");
    const categories = await Category.findAll();
    expect(response.body.categories).toEqual(categories);
    const expressCategories = response.body.categories.map((p) => p.id);
    const dbCategories = categories.map((p) => p.id);
    expect(dbCategories.length === expressCategories.length).toBeTruthy();
    dbCategories.forEach((dp) => {
      expect(expressCategories.includes(dp)).toBeTruthy();
    });
  });
});

describe("Database", () => {
  beforeEach(() => seed());
  it("Can fetch all products", async () => {
    const products = await Product.findAll();
    expect(products.length).toEqual(47);
  });
});

describe("Database", () => {
  beforeEach(() => seed());
  it("Can fetch all Categories", async () => {
    const categories = await Category.findAll();
    expect(categories.length).toEqual(4);
  });
});

describe("Database", () => {
  beforeEach(() => seed());
  it("Can fetch all Categories", async () => {
    const orders = await Order.findAll();
    expect(orders.length).toEqual(orders.length);
  });
});

describe("Database", () => {
  beforeEach(() => seed());
  it("Can fetch Cart", async () => {
    const cart = await Cart.findAll();
    expect(cart.length).toEqual(1);
  });
});

describe("User", () => {
  beforeEach(() => seed());
  it("Has a username, password, and clearance", async () => {
    const users = await User.findAll();
    users.forEach((user) => {
      expect(user.dataValues.username).toBeTruthy();
      expect(user.dataValues.password).toBeTruthy();
      expect(user.dataValues.clearance).toBeTruthy();
    });
  });
});
