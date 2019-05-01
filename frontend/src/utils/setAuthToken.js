import axios from "axios";
const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    // Delete Auth header
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
