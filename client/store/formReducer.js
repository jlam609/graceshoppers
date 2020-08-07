import TYPES from "./types";

const formReducer = (
  state = {
    username: "",
    password: "",
    visible: false,
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
        visible: false,
      };
    default:
      return state;
  }
};

export default formReducer;
