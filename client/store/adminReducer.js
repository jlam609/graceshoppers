import TYPES from "./types";
import Axios from "axios";
import {fetchProducts} from "./actions";

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
    return dispatch(updateAdmin("users", users));
  };
};

const fetchAdminAdmins = (where = "", page = 1, size = 10) => {
  return async (dispatch) => {
    const {admins} = (
      await Axios.get(`/api/admin/admins?filter=${where}&page=${page}&size=${size}`)
    ).data;
    return dispatch(updateAdmin("admins", admins));
  };
};

const fetchAdminProducts = (where = "", page = 1, size = 10) => {
  return async (dispatch) => {
    const {products} = (
      await Axios.get(`/api/admin/products?filter=${where}&page=${page}&size=${size}`)
    ).data;
    return dispatch(updateAdmin("products", products));
  };
};

const fetchAdminPendingOrders = (page = 1, size = 10) => {
  return async (dispatch) => {
    const {pendingOrders} = (
      await Axios.get(`/api/admin/pendingorders?page=${page}&size=${size}`)
    ).data;
    return dispatch(updateAdmin("pendingOrders", pendingOrders));
  };
};

const fetchAdminCompletedOrders = (page = 1, size = 10) => {
  return async (dispatch) => {
    const {completedOrders} = (
      await Axios.get(`/api/admin/completedorders?page=${page}&size=${size}`)
    ).data;
    return dispatch(updateAdmin("completedOrders", completedOrders));
  };
};

const fetchAdminData = () => {
  return async (dispatch) => {
    try {
      await dispatch(fetchAdminUsers());
      await dispatch(fetchAdminAdmins());
      await dispatch(fetchAdminProducts());
      await dispatch(fetchAdminPendingOrders());
      await dispatch(fetchAdminCompletedOrders());
    } catch (e) {
      console.error(e);
    }
  };
};

const updateUser = (userId) => {
  return async (dispatch) => {
    const {message} = await Axios.put(`/users/${userId}`).data;
    toast(message, {type: "success"});
    dispatch(fetchAdminUsers());
  };
};

const addProduct = (productObj) => {
  return async (dispatch) => {
    try {
      const {message} = (await Axios.post(`/api/admin/product`, productObj)).data;
      dispatch(fetchAdminProducts());
      toast(`${message}`, {type: "success"});
    } catch (e) {
      toast(`Error creating product, ${e}`, {type: "error"});
    }
  };
};
const updateProduct = (productObj) => {
  return async (dispatch) => {
    await Axios.put(`/api/admin/product/${productObj.id}`, productObj);
    toast(`${productObj.name} has been updated successfully!`);
    dispatch(fetchAdminProducts());
  };
};
const promote = (userObj) => {
  return async (dispatch) => {
    await Axios.put(`/api/admin/user/${userObj.id}`, userObj);
    return dispatch(fetchAdminProducts());
  };
};
const demote = (userObj) => {
  return async (dispatch) => {
    await Axios.put(`/api/admin/admin/${userObj.id}`, userObj);
    return dispatch(fetchAdminProducts());
  };
};
const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      const {message} = (await Axios.delete(`/api/admin/product/${id}`)).data;
      await dispatch(fetchAdminProducts());
      await dispatch(fetchProducts());
      toast(`${message}`, {type: "success"});
    } catch (e) {
      console.error(e);
      toast("Error deleting", {type: "error"});
    }
  };
};

const updateOrder = (id) => {
  return async (dispatch) => {
    await Axios.put(`/api/admin/order/${id}`);
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
    case TYPES.UPDATE_ADMIN:
      return {
        ...state,
        [action.name]: action.value,
      };
    default:
      return state;
  }
};

export {
  clearAdmin,
  fetchAdminData,
  updateUser,
  adminReducer,
  updateAdmin,
  updateOrder,
  updateProduct,
  promote,
  demote,
  deleteProduct,
  addProduct,
  fetchAdminAdmins,
  fetchAdminUsers,
  fetchAdminPendingOrders,
  fetchAdminCompletedOrders,
  fetchAdminProducts,
};
