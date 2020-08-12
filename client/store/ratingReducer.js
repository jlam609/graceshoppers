import TYPES from "./types";

const ratingReducer = (
  state = {
    rValue: "1",
    average: "No Reviews!",
    review: "",
    reviews: [],
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
    case TYPES.SET_REVIEW:
      return {
        ...state,
        review: action.review,
      };
    case TYPES.SET_REVIEWS:
      return {
        ...state,
        reviews: [...action.reviews],
      };
    default:
      return state;
  }
};

export default ratingReducer;
