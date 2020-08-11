import TYPES from "./types";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const changeView = (view) => ({
  type: TYPES.CHANGE_VIEW,
  view,
});
const selectData = (selected) => ({
  type: TYPES.SELECT_DATA,
  selected,
});
const clearView = () => ({
  type: TYPES.CLEAR_VIEW,
});
const updateSelected = (name, value) => ({
  type: TYPES.UPDATE_SELECTED,
  name,
  value,
});
const updateNewProduct = (name, value) => ({
  type: TYPES.UPDATE_NEW_PRODUCT,
  name,
  value,
});
const viewReducer = (
  state = {
    view: "Pending",
    selected: {},
    product: {
      name: "",
      quantity: 0,
      description: "",
      image: "",
      price: 0,
      categoryId: 1,
    },
  },
  action
) => {
  switch (action.type) {
    case TYPES.CHANGE_VIEW:
      return {
        ...state,
        view: action.view,
      };
    case TYPES.SELECT_DATA:
      return {
        ...state,
        selected: action.selected,
      };
    case TYPES.UPDATE_SELECTED:
      return {
        ...state,
        selected: {
          ...state.selected,
          [action.name]: action.value,
        },
      };
    case TYPES.UPDATE_NEW_PRODUCT:
      return {
        ...state,
        product: {
          ...state.product,
          [action.name]: action.value,
        },
      };
    case TYPES.CLEAR_VIEW:
      return {
        view: "Pending",
        selected: {},
        product: {
          name: "",
          quantity: 0,
          description: "",
          image: "",
          price: 0,
          categoryId: 1,
        },
      };
    default:
      return state;
  }
};

export {viewReducer, changeView, selectData, clearView, updateSelected, updateNewProduct};
