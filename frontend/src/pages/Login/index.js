import { connect } from "react-redux";
import authActions from "reducers/auth/actions";
import Container from "./container";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => ({
  errors: state.error,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  loginUser: (userData, history) =>
    dispatch(authActions.loginUser(userData, history))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Container));
