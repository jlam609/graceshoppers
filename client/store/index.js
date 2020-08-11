/* eslint-disable import/no-named-as-default-member */
import {createStore, applyMiddleware, combineReducers} from "redux";
import thunks from "redux-thunk";
import TYPES from "./types";
import cartReducer from "./cartReducer";
import countReducer from "./countReducer";
import formReducer from "./formReducer";
import inputReducer from "./inputReducer";
import orderReducer from "./orderReducer";
import productReducer from "./productReducer";
import userReducer from "./userReducer";
import ratingReducer from "./ratingReducer";
import {adminReducer} from "./adminReducer";
import {viewReducer} from "./viewReducer";

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

const masterReducer = combineReducers({
  cart: cartReducer,
  orders: orderReducer,
  products: productReducer,
  categories: categoryReducer,
  count: countReducer,
  form: formReducer,
  user: userReducer,
  input: inputReducer,
  admin: adminReducer,
  views: viewReducer,
  rating: ratingReducer,
});

const store = createStore(masterReducer, applyMiddleware(thunks));

export default store;
