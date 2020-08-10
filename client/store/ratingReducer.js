import TYPES from "./types";

const ratingReducer = (
  state = {
    rValue: "1",
    average: "No Reviews!",
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
    default:
      return state;
  }
};

export default ratingReducer;
