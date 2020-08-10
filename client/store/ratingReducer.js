import TYPES from "./types";

const ratingReducer = (
  state = {
    rValue: "1",
    average: "No Reviews!",
    exists: true,
  },
  action
) => {
  switch (action.type) {
    case TYPES.GET_RATING:
      return {
        ...state,
        rValue: action.rating,
      };
    case TYPES.SET_AVERAGE:
      return {
        ...state,
        average: action.average,
      };
    case TYPES.SET_EXISTS:
      return {
        ...state,
        exists: action.status,
      };
    default:
      return state;
  }
};

export default ratingReducer;
