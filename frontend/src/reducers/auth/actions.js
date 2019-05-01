import axios from "axios";
import authActions from "../alert/actions";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from "./types";
import setAuthToken from "../../utils/setAuthToken";

const actions = {
  // Load User
  loadUser: () => async dispatch => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/auth");
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  },
  // Register User
  registerUser: ({ name, email, password }) => async dispatch => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify({ name, email, password });
    try {
      const res = await axios.post("/api/users", body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      dispatch(actions.loadUser());
    } catch (err) {
      //console.log(err);
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error =>
          dispatch(authActions.setAlert(error.msg, "danger"))
        );
      }

      dispatch({ type: REGISTER_FAIL });
    }
  },
  // Login User
  loginUser: (email, password) => async dispatch => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post("/api/auth", body, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      dispatch(actions.loadUser());
    } catch (err) {
      //console.log(err);
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error =>
          dispatch(authActions.setAlert(error.msg, "danger"))
        );
      }

      dispatch({ type: LOGIN_FAIL });
    }
  },
  // Logout / Clear Profile
  logoutUser: () => async dispatch => {
    dispatch({ type: LOGOUT });
  }
};
// Register User
// const actions = {
//   // Register User
//   registerUser: (userData, history) => dispatch => {
//     axios
//       .post("/api/users/register", userData)
//       .then(res => history.push("/login"))
//       .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
//   },
//   // Login - Get User Token
//   loginUser: userData => dispatch => {
//     axios
//       .post("/api/users/login", userData)
//       .then(res => {
//         // Save to LocalStorage
//         const { token } = res.data;
//         // Set token to LS
//         localStorage.setItem("jwtToken", token);
//         // Set token to Auth header
//         setAuthToken(token);
//         // Decode token to get user data
//         const decoded = jwt_decode(token);
//         // Set current user
//         dispatch(setCurrentUser(decoded));
//       })
//       .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
//   },
//   // Log user out
//   logoutUser: history => dispatch => {
//     // Remove token from localStorage
//     localStorage.removeItem("jwtToken");
//     // Remove auth header for future request
//     setAuthToken(false);
//     // Set current user to {} whtich will set isAuthorized to false
//     dispatch(setCurrentUser({}));
//     history.push("/");
//   }
// };

// // Set logged in user
// export const setCurrentUser = decoded => {
//   return {
//     type: SET_CURRENT_USER,
//     payload: decoded
//   };
// };

// Logged user out

export default actions;
