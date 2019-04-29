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
      .post("/api/user/login", userData)
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
  }
};

// Set logged in user
const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export default actions;
