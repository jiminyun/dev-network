import { connect } from "react-redux";
import profileActions from "reducers/profile/actions";
import CreateProfile from "./createProfile";

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProfile);
