import {createStore, applyMiddleware, combineReducers} from "redux";
import thunks from "redux-thunk";
import TYPES from "./types";

const productReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.GET_PRODUCTS:
      return action.products ? [...action.products] : [];
    default:
      return state;
  }
};

const orderReducer = (
  state = {
    pendingOrders: [],
    activeOrders: {},
    doneOrders: [],
  },
  action
) => {
  switch (action.type) {
    case TYPES.GET_ORDERS:
      return {
        pendingOrders: action.orders
          ? action.orders.filter((order) => order.status === "pending")
          : [],
        activeOrders: action.orders
          ? action.orders.find((order) => order.status === "active")
          : [],
        doneOrders: action.orders
          ? action.orders.filter((order) => order.status === "done")
          : [],
      };
    case TYPES.SET_ORDER:
      return {
        ...state,
        activeOrders: action.order
          ? action.order.length
            ? action.order.find((order) => order.status === "active")
            : action.order
          : {},
      };
    default:
      return state;
  }
};

const categoryReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.GET_CATEGORIES:
      return [...action.categories];
    case TYPES.ADD_CATEGORY:
      return [...state.categories, action.category];
    case TYPES.RM_CATEGORY:
      return [...state.categories.filter((category) => category !== action.category)];
    default:
      return state;
  }
};

const cartReducer = (
  state = {
    products: [],
    total: 0,
    itemQuantity: 0,
  },
  action
) => {
  switch (action.type) {
    case TYPES.GET_CART: {
      return {
        products: action.cart ? [...action.cart] : [],
        total: action.total,
        itemQuantity: action.quantity,
      };
    }
    case TYPES.CLEAR_CART: {
      return {
        products: [],
        total: 0,
        itemQuantity: 0,
      };
    }
    default:
      return state;
  }
};

const formReducer = (
  state = {
    username: "",
    password: "",
    loggedIn: false,
  },
  action
) => {
  switch (action.type) {
    case TYPES.UPDATE_FORM:
      return {
        ...state,
        [action.name]: action.value,
      };
    case TYPES.CLEAR_FORM:
      return {
        username: "",
        password: "",
        loggedIn: false,
      };
    default:
      return state;
  }
};

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case TYPES.GET_USER:
      return {...action.user};
    case TYPES.CLEAR_USER:
      return {};
    default:
      return state;
  }
};

const countReducer = (
  state = {
    productsCount: 0,
  },
  action
) => {
  switch (action.type) {
    case TYPES.GET_PRODUCTS_COUNT:
      return {
        ...state,
        productsCount: action.count,
      };
    default:
      return state;
  }
};

const inputReducer = (
  state = {
    toggle: false,
    filter: "",
    quantity: 0,
    page: 1,
  },
  action
) => {
  switch (action.type) {
    case TYPES.UPDATE_INPUT:
      return {
        ...state,
        [action.name]: action.value,
      };
    case TYPES.CLEAR_INPUT:
      return {
        toggle: false,
        filter: "",
        quantity: 0,
        page: 1,
      };
    default:
      return state;
  }
};

const masterReducer = combineReducers({
  cart: cartReducer,
  orders: orderReducer,
  products: productReducer,
  categories: categoryReducer,
  count: countReducer,
  form: formReducer,
  user: userReducer,
  input: inputReducer,
});

const store = createStore(masterReducer, applyMiddleware(thunks));

export default store;
