import React, { Component } from "react";
import { Link } from "react-router-dom";
class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <ul className="footer navigation">
          <Link to="/">
            <li>connecters</li>
          </Link>
          <Link to="/profiles">
            <li>developers</li>
          </Link>
          <Link to="/register">
            <li>sign-in</li>
          </Link>
          <Link to="/login">
            <li>log in</li>
          </Link>
        </ul>
        <small className="copyright">
          Designed with <i className="fas fa-heart" />
          developers
        </small>
      </footer>
    );
  }
}

export default Footer;
