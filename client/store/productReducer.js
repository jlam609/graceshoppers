import TYPES from "./types";

const productReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.GET_PRODUCTS:
      return action.products ? [...action.products] : [];
    default:
      return state;
  }
};

export default productReducer;
