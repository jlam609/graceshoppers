import TYPES from "./types";

const formReducer = (
  state = {
    username: "",
    password: "",
    visible: false,
    loggedIn: false,
    policy: false,
    firstName: "",
    lastName: "",
    imageUrl: "",
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
        ...state,
        username: "",
        password: "",
        visible: false,
        policy: false,
        firstName: "",
        lastName: "",
        imageUrl: "",
      };
    case TYPES.LOGOUT:
      return {
        loggedIn: false,
      };
    default:
      return state;
  }
};

export default formReducer;
