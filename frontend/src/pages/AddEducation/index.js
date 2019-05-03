import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import profileActions from "reducers/profile/actions";
import AddEducation from "./addEducation";

const mapStateToProps = state => ({
  profile: state.profile
});

const mapDispatchToPros = dispatch => ({
  addEducation: (formData, history) =>
    dispatch(profileActions.addEducation(formData, history))
});

export default connect(
  mapStateToProps,
  mapDispatchToPros
)(withRouter(AddEducation));
