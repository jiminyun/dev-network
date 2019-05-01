import { connect } from "react-redux";
import authActions from "reducers/auth/actions";
import Login from "./login";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  loginUser: (email, password) =>
    dispatch(authActions.loginUser(email, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));
