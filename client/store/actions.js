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
    const { products } = (await axios.get("/api/products")).data;
    return dispatch(getProducts(products));
  };
};

const fetchCategories = () => {
  return async (dispatch) => {
    const { categories } = (await axios.get("/api/categories")).data;
    return dispatch(getCategories(categories));
  };
};

const fetchOrders = () => {
  return async (dispatch) => {
    const { orders } = (await axios.get("/api/orders")).data;
    return dispatch(getOrders(orders));
  };
};

const fetchCart = (user) => {
  return async (dispatch) => {
    const { products } = (await axios.get(`/api/cart/${user.id}`)).data;
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
};
