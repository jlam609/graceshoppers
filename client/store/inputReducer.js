import TYPES from "./types";

const inputReducer = (
  state = {
    toggle: false,
    filter: "",
    quantity: 0,
    page: 1,
    size: 10,
    loading: false,
    failed: false,
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
        size: 10,
        loading: false,
        failed: false,
      };
    default:
      return state;
  }
};

export default inputReducer;
