import { createStore, applyMiddleware, combineReducers } from "redux";
import thunks from "redux-thunk";
import TYPES from "./types";

const productReducer = (state = {}, action) => {
  switch (action.type) {
    case TYPES.GET_PRODUCTS:
      return [...action.products];
    default:
      return state;
  }
};

const orderReducer = (
  state = {
    pendingOrders: [],
    activeOrders: [],
    doneOrders: [],
  },
  action
) => {
  switch (action.type) {
    case TYPES.GET_ORDERS:
      return {
        pendingOrders: [
          ...action.orders.filter((order) => order.status === "pending"),
        ],
        activeOrders: [
          ...action.orders.filter((order) => order.status === "active"),
        ],
        doneOrders: [
          ...action.orders.filter((order) => order.status === "done"),
        ],
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
    case TYPES.REMOVE_CATEGORY:
      return [...state.categories.filter(category !== action.category)];
    default:
      return state;
  }
};

const cartReducer = (
  state = {
    products: [],
    total: 0,
  },
  action
) => {
  switch (action.type) {
    case TYPES.GET_CART:
      const total = action.cart.reduce((a, b) => a.price + b.price);
      return {
        products: [...action.cart],
        total: total,
      };
    case TYPES.ADD_TO_CART:
      return {
        products: [...state.products, action.product],
        total: state.total + action.product.price,
      };
    case TYPES.RM_FROM_CART:
      return {
        products: [
          ...state.products.filter((product) => product !== action.product),
        ],
        total: state.total - action.product.price,
      };
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

const userReducer = (state = [], action) => {
	switch (action.type){
	case TYPES.GET_USER: 
		return [action.user];
	case TYPES.CLEAR_USER:
		return []
	default:
	return state
}
}


const masterReducer = combineReducers({
  cart: cartReducer,
  orders: orderReducer,
  products: productReducer,
  categories: categoryReducer,
  form : formReducer,
  user : userReducer
});

const store = createStore(masterReducer, applyMiddleware(thunks));

export default store;
