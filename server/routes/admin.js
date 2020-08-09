const adminRouter = require("express").Router();
const {
  models: {User, Product, Order},
} = require("../db");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

const {Op} = Sequelize;

const getPagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? (page - 1) * limit : 0;
  return {
    limit,
    offset,
  };
};

adminRouter.get("/users?", async (req, res) => {
  try {
    const {filter, page, size} = req.query;
    let userData;
    const {limit, offset} = getPagination(page, size);
    if (!filter.length) {
      userData = await User.findAndCountAll({
        limit,
        offset,
        where: {
          clearance: 1,
        },
      });
    } else {
      userData = await User.findAndCountAll({
        limit,
        offset,
        where: {
          [Op.and]: [
            {
              username: {
                [Op.iLike]: `%${filter}%`,
              },
            },
            {
              clearance: 1,
            },
          ],
        },
      });
    }
    res.status(201).send({users: userData});
  } catch (e) {
    throw new Error("Could not send data.");
  }
});

adminRouter.get("/admins?", async (req, res) => {
  try {
    const {filter, page, size} = req.query;
    let adminData;
    const {limit, offset} = getPagination(page, size);
    if (!filter.length) {
      adminData = await User.findAndCountAll({
        limit,
        offset,
        where: {
          clearance: 5,
        },
      });
    } else {
      adminData = await User.findAndCountAll({
        limit,
        offset,
        where: {
          [Op.and]: [
            {
              username: {
                [Op.iLike]: `%${filter}%`,
              },
            },
            {
              clearance: 5,
            },
          ],
        },
      });
    }
    res.send({admins: adminData});
  } catch (e) {
    throw new Error("Could not send data.");
  }
});

adminRouter.get("/products/?", async (req, res) => {
  try {
    if (req.isAuthenticated && req.user && req.user.clearance === 5) {
      const {page, size, filter} = req.query;
      const {limit, offset} = getPagination(page, size);
      let products;
      if (!filter.length) {
        products = await User.findAndCountAll({
          limit,
          offset,
          where: {},
        });
      } else {
        products = await User.findAndCountAll({
          limit,
          offset,
          where: {
            name: {
              [Op.iLike]: `%${filter}%`,
            },
          },
        });
      }
      res.status(201).send({products});
    }
  } catch (e) {
    console.error("Error", e);
  }
});

adminRouter.get("/pendingorders/?", async (req, res) => {
  try {
    if (req.isAuthenticated && req.user && req.user.clearance === 5) {
      const {page, size} = req.query;
      const {limit, offset} = getPagination(page, size);
      const pendingOrders = await Order.findAndCountAll({
        limit,
        offset,
        where: {
          status: "pending",
        },
      });
      res.send({
        pendingOrders,
      });
    }
  } catch (e) {
    console.error("Error", e);
  }
});

adminRouter.get("/completedorders/?", async (req, res) => {
  try {
    if (req.isAuthenticated && req.user && req.user.clearance === 5) {
      const {page, size} = req.query;
      const {limit, offset} = getPagination(page, size);
      const completedOrders = await Order.findAndCountAll({
        limit,
        offset,
        where: {
          status: "completed",
        },
      });
      res.send({
        completedOrders,
      });
    }
  } catch (e) {
    console.error("Error", e);
  }
});

adminRouter.post("/register", async (req, res) => {
  try {
    if (req.isAuthenticated && req.user && req.user.clearance === 5) {
      const {username, password} = req.body;
      if (username && password) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        await User.create({
          username,
          password: hash,
          clearance: 5,
          salt,
        });
        res.status(202).send({
          message: `admin ${username} successfully created`,
        });
      }
    }
  } catch (e) {
    res.status(500).send({
      message: ("error creating admin", e),
    });
  }
});

adminRouter.put("/user:id", async (req, res) => {
  const {id} = req.body;
  try {
    if (req.isAuthenticated && req.user && req.user.clearance === 5) {
      await User.update(
        {
          clearance: 5,
        },
        {
          where: {
            id,
          },
        }
      );
      res.status(201).send({
        message: `User ${id} is now an admin`,
      });
    }
  } catch (e) {
    console.error("Error", e);
    res.status(500).send({
      message: `Error updating User ${id}`,
    });
  }
});

adminRouter.put("/order/:id", async (req, res) => {
  const {id} = req.params;
  try {
    if (req.isAuthenticated && req.user && req.user.clearance === 5) {
      await Order.update(
        {
          status: "completed",
        },
        {
          where: {
            id,
          },
        }
      );
      res.status(201).send({
        message: `Order ${id} updated`,
      });
    }
  } catch (e) {
    console.error("Error", e);
    res.status(500).send({
      message: `Error updating order ${id}`,
    });
  }
});

module.exports = adminRouter;
