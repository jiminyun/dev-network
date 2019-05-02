import { connect } from "react-redux";
import Dashboard from "./dashboard";
import actionProfile from "reducers/profile/actions";

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

const mapDispatchToPros = dispatch => ({
  getCurrentProfile: () => dispatch(actionProfile.getCurrentProfile())
});

export default connect(
  mapStateToProps,
  mapDispatchToPros
)(Dashboard);
