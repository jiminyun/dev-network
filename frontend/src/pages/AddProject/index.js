import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import profileActions from "reducers/profile/actions";
import AddProject from "./addProject";

const mapStateToProps = state => ({
  profile: state.profile
});

const mapDispatchToPros = dispatch => ({
  addProject: (formData, history) =>
    dispatch(profileActions.addProject(formData, history))
});

export default connect(
  mapStateToProps,
  mapDispatchToPros
)(withRouter(AddProject));
