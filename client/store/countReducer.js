import TYPES from "./types";

const countReducer = (
  state = {
    productsCount: 0,
    item: {},
  },
  action
) => {
  switch (action.type) {
    case TYPES.GET_PRODUCTS_COUNT:
      return {
        ...state,
        productsCount: action.count,
      };
    case TYPES.SET_PRODUCT:
      return {
        ...state,
        item: action.product,
      };
    default:
      return state;
  }
};

export default countReducer;
