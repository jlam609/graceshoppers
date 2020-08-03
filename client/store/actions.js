const axios = require("axios");
const TYPES = require("./types");

const getProducts = (products) => ({
  type: TYPES.GET_PRODUCTS,
  products,
});

const getOrders = (orders) => ({
  type: TYPES.GET_ORDERS,
  orders,
});

const getCategories = (categories) => ({
  type: TYPES.GET_CATEGORIES,
  categories,
});

const addCategory = (category) => ({
  type: TYPES.ADD_CATEGORY,
  category,
});

const removeCategory = (category) => ({
  type: TYPES.RM_CATEGORY,
  category,
});

const getCart = (cart, total, quantity) => ({
  type: TYPES.GET_CART,
  cart,
  total,
  quantity,
});

const removeFromCart = (product) => ({
  type: TYPES.RM_FROM_CART,
  product,
});

const fetchProducts = () => {
  return async (dispatch) => {
    const {products} = (await axios.get("/api/products")).data;
    return dispatch(getProducts(products));
  };
};

const fetchCategories = () => {
  return async (dispatch) => {
    const {categories} = (await axios.get("/api/categories")).data;
    return dispatch(getCategories(categories));
  };
};

const fetchOrders = (userId) => {
  return async (dispatch) => {
    const {orders} = (await axios.get(`/api/orders/${userId}`)).data;
    await dispatch(getOrders(orders));
    return orders;
  };
};

const fetchCart = (orderId) => {
  return async (dispatch) => {
    const {cart, products} = (await axios.get(`/api/carts/${orderId}`)).data;
    let total = 0;
    let quantity = 0;
    if (cart.length) {
      cart.forEach((item) => {
        const curProduct = products.find((product) => product.id === item.productId);
        total += curProduct.price * item.quantity;
        quantity += item.quantity;
        item.product = curProduct;
      });
    }
    console.log(cart, total, quantity);
    return dispatch(getCart(cart, total, quantity));
  };
};

const updateForm = (name, value) => ({
  type: TYPES.UPDATE_FORM,
  name,
  value,
});
const clearForm = () => ({
  type: TYPES.CLEAR_FORM,
});

const getUser = (user) => ({
  type: TYPES.GET_USER,
  user,
});

const clearUser = () => ({
  type: TYPES.CLEAR_USER,
});
const fetchUser = () => {
  return async (dispatch) => {
    const {user} = (await axios.get(`/api/auth/login`)).data;
    if (user) {
      await dispatch(getUser(user));
      const orders = await dispatch(fetchOrders(user.id));
      const activeOrders = orders.length
        ? orders.find((order) => order.status === "active")
        : false;
      return [user, activeOrders];
    }
    return [false, false];
  };
};

const login = (userObj) => {
  return async (dispatch) => {
    const {user, message} = (await axios.post(`/api/auth/login`, userObj)).data;
    if (user) {
      await dispatch(getUser(user));
      await dispatch(fetchOrders(user.id));
      await dispatch(fetchCart(user.id));
      return alert(`${message}`);
    }
    return alert(`${message}`);
  };
};

const setOrder = (order) => ({
  type: TYPES.SET_ORDER,
  order,
});

const fetchSessionOrder = () => {
  return async (dispatch) => {
    const {order} = (await axios.get(`/api/orders/session`)).data;
    await dispatch(setOrder(order));
    console.log(order);
    await dispatch(fetchCart(order[0].id));
    return order;
  };
};
const createOrder = (userId) => {
  return async (dispatch) => {
    if (userId) {
      const {order} = (await axios.post(`/api/orders`, {userId})).data;
      return dispatch(setOrder(order));
    }
  };
};

const updateOrder = (orderId, userId) => {
  return async (dispatch) => {
    await axios.put(`/api/orders/${orderId}`, {userId});
    return dispatch(fetchCart(userId));
  };
};

const updateCart = (mode = "add", orderId, product, quantity) => {
  return async (dispatch) => {
    if (mode === "add") {
      const {message} = (
        await axios.put(`/api/carts/${orderId}`, {
          productId: product.id,
          quantity,
        })
      ).data;
      await dispatch(fetchCart(orderId));
      return alert(`${message}`);
    }
    if (mode === "remove") {
      if (quantity === 0) {
        const {message} = (
          await axios.delete(`/api/carts/${orderId}`, {
            productId: product.id,
            quantity,
          })
        ).data;
        await dispatch(fetchCart(orderId));
        return alert(`${message}`);
      }
      const {message} = (
        await axios.put(`/api/carts/${orderId}`, {
          productId: product.id,
          quantity,
        })
      ).data;
      await dispatch(fetchCart(orderId));
      return alert(`${message}`);
    }
  };
};

const updateInput = (name, value) => ({
  type: TYPES.UPDATE_INPUT,
  name,
  value,
});

const clearInput = () => ({
  type: TYPES.CLEAR_INPUT,
});

module.exports = {
  getProducts,
  getOrders,
  getCategories,
  addCategory,
  removeCategory,
  getCart,
  removeFromCart,
  fetchProducts,
  fetchOrders,
  fetchCategories,
  fetchCart,
  updateForm,
  clearForm,
  clearUser,
  fetchUser,
  login,
  createOrder,
  updateOrder,
  updateCart,
  updateInput,
  clearInput,
  fetchSessionOrder,
};
