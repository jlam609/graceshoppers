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

const getCart = (cart) => ({
  type: TYPES.GET_CART,
  cart,
});

const addToCart = (product) => ({
  type: TYPES.ADD_TO_CART,
  product,
});

const removeFromCart = (product) => ({
  type: TYPES.RM_FROM_CART,
  product,
});

const fetchProducts = () => {
  return async (dispatch) => {
    const {products} = (await axios.get("/api/products")).data;
    console.log(products);
    return dispatch(getProducts(products));
  };
};

const fetchCategories = () => {
  return async (dispatch) => {
    const {categories} = (await axios.get("/api/categories")).data;
    return dispatch(getCategories(categories));
  };
};

const fetchOrders = () => {
  return async (dispatch) => {
    const {orders} = (await axios.get("/api/orders")).data;
    return dispatch(getOrders(orders));
  };
};

const fetchCart = (user) => {
  return async (dispatch) => {
    const {products} = (await axios.get(`/api/cart/${user.id}`)).data;
    return dispatch(getCart(products));
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
      await dispatch(fetchCart(user.id));
      await dispatch(fetchOrders(user.id));
    }
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

const createOrder = (userId = null) => {
  return async (dispatch) => {
    if (userId) {
      const {order} = (await axios.post(`/api/order`, {userId})).data;
      return dispatch(setOrder(order));
    }
    const {order} = (await axios.post(`/api/order`)).data;
    return dispatch(setOrder(order));
  };
};

const updateOrder = (orderId, userId) => {
  return async (dispatch) => {
    await axios.put(`/api/order/${orderId}`, {userId});
    return dispatch(fetchCart(userId));
  };
};

const updateCart = (mode = "add", orderId, product, quantity) => {
  return async (dispatch) => {
    if (mode === "add") {
      await axios.put(`/api/cart/${orderId}`, {
        productId: product.id,
        orderId,
        quantity,
      });
      return dispatch(addToCart(product));
    }
    if (mode === "remove") {
      if (quantity === 0) {
        await axios.delete(`/api/cart/${orderId}`, {
          productId: product.id,
          orderId,
          quantity,
        });
        return dispatch(removeFromCart(product));
      }
      await axios.put(`/api/cart/${orderId}`, {
        productId: product.id,
        orderId,
        quantity,
      });
      return dispatch(removeFromCart(product));
    }
  };
};

module.exports = {
  getProducts,
  getOrders,
  getCategories,
  addCategory,
  removeCategory,
  getCart,
  addToCart,
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
};
