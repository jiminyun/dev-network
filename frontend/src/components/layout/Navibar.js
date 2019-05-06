import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import authActions from "reducers/auth/actions";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import SideBar from "./Sidebar";
import { withRouter } from "react-router-dom";

const Navibar = ({ auth: { isAuthenticated, loading }, logoutUser }) => {
  const [displaySideBar, toggleSideBar] = useState(false);

  useEffect(() => {
    document.addEventListener("mouseover", handleMouseOver);
  }, []);

  const ref = useRef();
  const handleMouseOver = e => {
    ref.current.contains(e.target) ? toggleSideBar(true) : toggleSideBar(false);
  };

  const authLinks = (
    <ul className="nav-links">
      <Link to="/dashboard">
        <li key="0">Dashboard</li>
      </Link>
      <Link to="/profiles">
        <li key="1">Developers</li>
      </Link>
      <a onClick={logoutUser} href="#!">
        <li key="2">Logout</li>
      </a>
    </ul>
  );
  const guestLinks = (
    <ul className="nav-links">
      <Link to="/profiles">
        <li key="0">Developers</li>
      </Link>
      <Link to="/login">
        <li key="1">Login</li>
      </Link>
      <Link to="/register">
        <li key="2">Sign in</li>
      </Link>
    </ul>
  );

  return (
    <>
      <NavWrapper>
        <div className="nav_center">
          <a href="#!">
            <FaBars
              className="nav-icon"
              onClick={() => toggleSideBar(!displaySideBar)}
            />
          </a>
          {!loading && !isAuthenticated ? guestLinks : authLinks}
        </div>
      </NavWrapper>
      <div ref={ref}>
        <SideBar
          show={displaySideBar}
          isAuthenticated={isAuthenticated}
          loading={loading}
          logoutUser={logoutUser}
        />
      </div>
    </>
  );
};

Navibar.propTypes = {
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
)(withRouter(Navibar));

const NavWrapper = styled.nav`
  position: -webkit-sticky;
  position: sticky;
  background: red;
  top: 0;
  width: 100%;
  padding: 1rem 1.5rem;
  background: white;
  z-index: 999;
  border-bottom: 1px solid lightgrey;
  .nav-links {
    padding: 0.5rem;
    width: 280px;
  }
`;
