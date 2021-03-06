import { GET_ERRORS } from "./types";

const initialState = {
  errors: {}
};

const errors = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
};

export default errors;
