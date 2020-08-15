import TYPES from "./types";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case TYPES.GET_USER:
      return {
        ...action.user,
        password: "",
      };
    case TYPES.CLEAR_USER:
      return {};
    case TYPES.EDIT_USER:
      return {
        ...state,
        [action.name]: action.value,
      };
    default:
      return state;
  }
};

export default userReducer;
