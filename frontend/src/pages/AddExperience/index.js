import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import profileActions from "reducers/profile/actions";
import AddExperience from "./addExperience";

const mapStateToProps = state => ({
  profile: state.profile
});

const mapDispatchToPros = dispatch => ({
  addExperience: (formData, history) =>
    dispatch(profileActions.addExperience(formData, history))
});

export default connect(
  mapStateToProps,
  mapDispatchToPros
)(withRouter(AddExperience));
