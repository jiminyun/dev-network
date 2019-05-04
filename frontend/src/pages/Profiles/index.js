import { connect } from "react-redux";
import profileActions from "reducers/profile/actions";
import Profiles from "./profiles";

const mapStateToProps = state => ({
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  getProfiles: () => dispatch(profileActions.getProfiles())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profiles);
