import TYPES from "./types";

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

export default userReducer;
