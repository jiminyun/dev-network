import { SET_ALERT, REMOVE_ALERT } from "./types";
const initialState = [];
// const initialState = [
//     {id:1, msg: "please log in", alertType: "success"}
// ]

const alert = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, payload]; //add
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
};

export default alert;
