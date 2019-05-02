import { connect } from "react-redux";
import profileActions from "reducers/profile/actions";
import CreateProfile from "./createProfile";
import { withRouter } from "react-router-dom";

const mapDispatchToPros = dispatch => ({
  createProfile: (formData, history) =>
    dispatch(profileActions.createProfile(formData, history))
});

export default connect(
  null,
  mapDispatchToPros
)(withRouter(CreateProfile));
