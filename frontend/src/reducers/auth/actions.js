import axios from "axios";
import setAuthToken from "utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS } from "../error/types";
import { SET_CURRENT_USER } from "./types";

// Register User
const actions = {
  // Register User
  registerUser: (userData, history) => dispatch => {
    axios
      .post("/api/users/register", userData)
      .then(res => history.push("/login"))
      .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
  },
  // Login - Get User Token
  loginUser: userData => dispatch => {
    axios
      .post("/api/users/login", userData)
      .then(res => {
        // Save to LocalStorage
        const { token } = res.data;
        // Set token to LS
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(setCurrentUser(decoded));
      })
      .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
  },
  // Log user out
  logoutUser: () => (dispatch, history) => {
    // Remove token from localStorage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future request
    setAuthToken(false);
    // Set current user to {} whtich will set isAuthorized to false
    dispatch(setCurrentUser({}));
  }
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Logged user out

export default actions;
