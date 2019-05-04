import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import authActions from "reducers/auth/actions";
import { withRouter } from "react-router-dom";

const Footer = ({ auth: { isAuthenticated, loading }, logoutUser }) => {
  const authLinks = (
    <ul className="footer navigation">
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <a onClick={logoutUser} href="#!">
          <i className="fas fa-sign-out-alt" />
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul className="footer navigation">
      <li>
        <Link to="/profiles">
          <i className="fas" /> <span>developers</span>
        </Link>
        <Link to="/login">
          <i className="fas" /> <span>login </span>
        </Link>
        <Link to="/register">
          <i className="fas" /> <span>sign in</span>
        </Link>
      </li>
    </ul>
  );

  return (
    <footer className="footer">
      {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
      {/* <small className="copyright">
        Designed with <i className="fas fa-heart" />
        developers
      </small> */}
    </footer>
  );
};

Footer.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  logoutUser: history => dispatch(authActions.logoutUser(history))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Footer));
