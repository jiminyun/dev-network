import axios from "axios";
import alertActions from "../alert/actions";
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  GET_REPOS
} from "./types";
import { ACCOUNT_DELETED } from "../auth/types";

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
  },
  // Get all profiles
  getProfiles: () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    try {
      const res = await axios.get("/api/profile");

      dispatch({
        type: GET_PROFILES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  },
  // Get profile by id
  getProfileById: userId => async dispatch => {
    try {
      const res = await axios.get(`/api/profile/user/${userId}`);

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
  },
  // Get Github repos
  getGithubRepos: username => async dispatch => {
    try {
      const res = await axios.get(`/api/profile/github/${username}`);

      dispatch({
        type: GET_REPOS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  },
  // Create or update profile
  createProfile: (formData, history, edit = false) => async dispatch => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await axios.post("/api/profile", formData, config);

      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });

      dispatch(
        alertActions.setAlert(
          edit ? "Profile Updated" : "Profile Created",
          "success"
        )
      );

      if (!edit) {
        history.push("/dashboard");
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error =>
          dispatch(alertActions.setAlert(error.msg, "danger"))
        );
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  },
  // Add experience
  addExperience: (formData, history) => async dispatch => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const res = await axios.put("api/profile/experience", formData, config);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });

      dispatch(alertActions.setAlert("Experience Added", "success"));
      history.push("/dashboard");
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(err =>
          dispatch(alertActions.setAlert(err.msg, "danger"))
        );
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  },
  // Add education
  addEducation: (formData, history) => async dispatch => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const res = await axios.put("api/profile/education", formData, config);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });

      dispatch(alertActions.setAlert("Education Added", "success"));
      history.push("/dashboard");
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(error =>
          dispatch(alertActions.setAlert(error.msg, "danger"))
        );
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  },

  // Delete experience
  deleteExperience: id => async dispatch => {
    try {
      const res = await axios.delete(`/api/profile/experience/${id}`);
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });

      dispatch(alertActions.setAlert("Experience Removed", "success"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  },

  // Delete education
  deleteEducation: id => async dispatch => {
    try {
      const res = await axios.delete(`/api/profile/education/${id}`);
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });

      dispatch(alertActions.setAlert("Education Removed", "success"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  },

  // Delete account and profile
  deleteAccount: () => async dispatch => {
    if (window.confirm("Are you sure? This can NOT be undone")) {
      try {
        await axios.delete("/api/profile");

        dispatch({ type: CLEAR_PROFILE });
        dispatch({ type: ACCOUNT_DELETED });
        dispatch(
          alertActions.setAlert("Your account has been permanently deleted")
        );
      } catch (err) {
        dispatch({
          type: PROFILE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
      }
    }
  }
};

export default actions;
