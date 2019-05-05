import { connect } from "react-redux";
import profileActions from "reducers/profile/actions";
import Profile from "./profile";

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  getProfileById: user_id => dispatch(profileActions.getProfileById(user_id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
