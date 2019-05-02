import axios from "axios";
import alertActions from "../alert/actions";
import { GET_PROFILE, PROFILE_ERROR } from "./types";

const actions = {
  // Get current user profile
  getCurrentProfile: () => async dispatch => {
    try {
      const res = await axios.get("/api/profile/me");

      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

export default actions;
