import { connect } from "react-redux";
import authActions from "reducers/auth/actions";
import EditAvatar from "./editAvatar";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => ({
  user: state.auth.user,
  loading: state.auth.loading
});
const mapDispatchToProps = dispatch => ({
  updateAvatar: avatar => dispatch(authActions.updateAvatar(avatar))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditAvatar));
