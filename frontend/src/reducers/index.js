import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import alertReducer from "./alert/reducer";
//import errorReducer from "./error/reducer";

export default combineReducers({
  auth: authReducer,
  alert: alertReducer
});
