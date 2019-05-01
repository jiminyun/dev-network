import { connect } from "react-redux";
import authActions from "reducers/auth/actions";
import alertActions from "reducers/alert/actions";
import Register from "./register";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  registerUser: ({ name, email, password }) =>
    dispatch(authActions.registerUser({ name, email, password })),
  setAlert: (msg, alertType) => dispatch(alertActions.setAlert(msg, alertType))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
