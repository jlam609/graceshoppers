import TYPES from "./types";

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

export default countReducer;
