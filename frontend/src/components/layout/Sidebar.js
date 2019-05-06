import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Sidebar = props => {
  const authLinks = (
    <ul>
      <Link to="/">
        <li key="1" className="sidebar-link">
          Home
        </li>
      </Link>
      <Link to="/dashboard">
        <li key="2" className="sidebar-link">
          Dashboard
        </li>
      </Link>
      <Link to="/profiles">
        <li key="3" className="sidebar-link">
          Developers
        </li>
      </Link>
      <a onClick={props.logoutUser} href="#!">
        <li key="4" className="sidebar-link">
          Logout
        </li>
      </a>
    </ul>
  );
  const guestLinks = (
    <ul>
      <Link to="/">
        <li key="1" className="sidebar-link">
          Home
        </li>
      </Link>
      <Link to="/profiles">
        <li key="2" className="sidebar-link">
          Developers
        </li>
      </Link>
      <Link to="/login">
        <li key="3" className="sidebar-link">
          Login
        </li>
      </Link>
      <Link to="/register">
        <li key="4" className="sidebar-link">
          Signin
        </li>
      </Link>
    </ul>
  );

  return (
    <SideWrapper show={props.show}>
      {!props.loading && !props.isAuthenticated ? guestLinks : authLinks}
    </SideWrapper>
  );
};

export default Sidebar;

const SideWrapper = styled.nav`
  position: fixed;
  top: 61px;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 1;
  border-right: 4px solid lightgray;
  transition: all 0.3s ease-in-out;
  transform: ${props => (props.show ? "translateX(0)" : "translateX(-100%)")} ;
  ul {
    padding: 0 !important;
  }
  .sidebar-link {
      display: block,
      font-size: 1.5em
      text-transform: capitalize;
      color : black;
      padding: 0.5rem 1.5rem
      background:transparent;
      transition: all 0.3s ease-in-out;
      
  }
  .sidebar-link:hover{
      background: lightgrey;
      color: white;
      padding: 0.5rem
      text-decoration: none !important;
  }

   @media(min-width:576px) {
       width: 10rem;
   }
`;
