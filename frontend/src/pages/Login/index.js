import { connect } from "react-redux";
import authActions from "reducers/auth/actions";
import Container from "./container";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => ({
  errors: state.error,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  loginUser: userData => dispatch(authActions.loginUser(userData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Container));
