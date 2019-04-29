import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import authActions from "reducers/auth/actions";
import { withRouter } from "react-router-dom";

class Footer extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="footer navigation">
        <li>
          <img
            className="rounded-circle"
            src={user.avatar}
            alt={user.name}
            style={{ width: "25px", marginRight: "5px" }}
            title="You must have a Gravatar connected to your email to display an image"
          />
          {` `}{" "}
          <a href="#" onClick={this.onLogoutClick.bind(this)}>
            logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="footer navigation">
        <li>
          <Link to="/register">sign-in</Link>
        </li>
        <li>
          <Link to="/login">log in</Link>
        </li>
      </ul>
    );

    return (
      <footer className="footer">
        <ul className="footer navigation">
          <li>
            <Link to="/">connecters</Link>
          </li>
          <li>
            <Link to="/profiles">developers</Link>
          </li>
        </ul>
        {isAuthenticated ? authLinks : guestLinks}
        <small className="copyright">
          Designed with <i className="fas fa-heart" />
          developers
        </small>
      </footer>
    );
  }
}

Footer.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  logoutUser: (userData, history) =>
    dispatch(authActions.logoutUser(userData, history))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Footer));
