import { connect } from "react-redux";
import profileActions from "reducers/profile/actions";
import EditProfile from "./editProfile";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => ({
  profile: state.profile
});
const mapDispatchToProps = dispatch => ({
  createProfile: (formData, history, edit = true) =>
    dispatch(profileActions.createProfile(formData, history, (edit = true))),
  getCurrentProfile: () => dispatch(profileActions.getCurrentProfile())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditProfile));
