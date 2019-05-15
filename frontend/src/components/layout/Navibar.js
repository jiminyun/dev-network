import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import authActions from "reducers/auth/actions";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
// Material UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const Navibar = ({
  auth: { isAuthenticated, loading },
  logoutUser,
  classes
}) => {
  // useEffect(() => {
  //   document.addEventListener("mouseover", handleMouseOver);
  // }, []);

  // const ref = useRef();
  // const handleMouseOver = e => {
  //   ref.current.contains(e.target) ? toggleSideBar(true) : toggleSideBar(false);
  // };

  const authLinks = (
    <>
      <Button color="inherit" component={Link} to="/dashboard">
        Dashboard
      </Button>
      <Button color="inherit" component={Link} to="/profiles">
        People
      </Button>
      <Button color="inherit" onClick={logoutUser}>
        Logout
      </Button>
    </>
    // <ul className="nav-links">
    //   <Link to="/dashboard">
    //     <li key="0">Dashboard</li>
    //   </Link>
    //   <Link to="/profiles">
    //     <li key="1">People</li>
    //   </Link>
    //   <a onClick={logoutUser} href="#!">
    //     <li key="2">Logout</li>
    //   </a>
    // </ul>
  );
  const guestLinks = (
    <>
      <Button color="inherit" component={Link} to="/profiles">
        People
      </Button>
      <Button color="inherit" component={Link} to="/login">
        Login
      </Button>
      <Button color="inherit" component={Link} to="/register">
        Sign in
      </Button>
    </>
    // <ul className="nav-links">
    //   <Link to="/profiles">
    //     <li key="0">People</li>
    //   </Link>
    //   <Link to="/login">
    //     <li key="1">Login</li>
    //   </Link>
    //   <Link to="/register">
    //     <li key="2">Sign in</li>
    //   </Link>
    // </ul>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Profile Generator
          </Typography>
          {!loading && !isAuthenticated ? guestLinks : authLinks}
        </Toolbar>
      </AppBar>
    </div>
  );
};
const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
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

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(Navibar))
);

// const NavWrapper = styled.nav`
//   position: -webkit-sticky;
//   position: sticky;
//   background: red;
//   top: 0;
//   width: 100%;
//   padding: 1rem 1.5rem;
//   background: white;
//   z-index: 999;
//   border-bottom: 1px solid lightgrey;
//   .nav-links {
//     width: 280px;
//   }
// `;
