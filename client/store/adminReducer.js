import TYPES from "./types";
import Axios from "axios";

const {toast} = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");

toast.configure();

const setAdminData = (users, admins, products, pendingOrders, doneOrders) => ({
  type: TYPES.SET_ADMIN_DATA,
  users,
  admins,
  products,
  pendingOrders,
  doneOrders,
});
const clearAdmin = () => ({
  type: TYPES.CLEAR_ADMIN,
});
const updateAdmin = (name, value) => ({
  type: TYPES.UPDATE_ADMIN,
  name,
  value,
});

const fetchAdminUsers = (where = "", page = 1, size = 10) => {
  return async (dispatch) => {
    const {users} = (
      await Axios.get(`/api/admin/users?filter=${where}&page=${page}&size=${size}`)
    ).data;
    return users;
  };
};

const fetchAdminAdmins = (where = "", page = 1, size = 10) => {
  return async (dispatch) => {
    const {admins} = (
      await Axios.get(`/api/admin/admins?filter=${where}&page=${page}&size=${size}`)
    ).data;
    return admins;
  };
};

const fetchAdminProducts = (where = "", page = 1, size = 10) => {
  return async (dispatch) => {
    const {products} = (
      await Axios.get(`/api/admin/products?filter=${where}&page=${page}&size=${size}`)
    ).data;
    return products;
  };
};

const fetchAdminPendingOrders = (page = 1, size = 10) => {
  return async (dispatch) => {
    const {pendingOrders} = (
      await Axios.get(`/api/admin/pendingorders?page=${page}&size=${size}`)
    ).data;
    return pendingOrders;
  };
};

const fetchAdminCompletedOrders = (page = 1, size = 10) => {
  return async (dispatch) => {
    const {completedOrders} = (
      await Axios.get(`/api/admin/completedorders?page=${page}&size=${size}`)
    ).data;
    return completedOrders;
  };
};

const fetchAdminData = () => {
  return async (dispatch) => {
    const users = await dispatch(fetchAdminUsers());
    const admins = await dispatch(fetchAdminAdmins());
    const products = await dispatch(fetchAdminProducts());
    const pendingOrders = await dispatch(fetchAdminPendingOrders());
    const completedOrders = await dispatch(fetchAdminCompletedOrders());
    return dispatch(
      setAdminData(users, admins, products, pendingOrders, completedOrders)
    );
  };
};

const updateUser = (userId) => {
  return async (dispatch) => {
    const {message} = await Axios.put(`/users/${userId}`).data;
    toast(message, {type: "success"});
    dispatch(fetch);
  };
};

const adminReducer = (
  state = {
    users: {},
    admins: {},
    products: {},
    pendingOrders: {},
    completedOrders: {},
  },
  action
) => {
  switch (action.type) {
    case TYPES.SET_ADMIN_DATA:
      return {
        users: action.users,
        admins: action.admins,
        products: action.products,
        pendingOrders: action.pendingOrders,
        completedOrders: action.completedOrders,
      };
    case TYPES.CLEAR_ADMIN:
      return {
        users: {},
        admins: {},
        products: {},
        pendingOrders: {},
        completedOrders: {},
      };
    default:
      return state;
  }
};

export {clearAdmin, fetchAdminData, updateUser, adminReducer, updateAdmin};
