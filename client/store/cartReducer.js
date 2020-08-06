import TYPES from "./types";

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

export default cartReducer;
