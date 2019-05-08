import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Header = ({ profile, auth }) => {
  const { user, social, status, githubusername } = profile;
  return (
    <header className="header">
      <div className="container clearfix">
        <img
          className="profile-image img-fluid float-left"
          src={user.avatar}
          alt={user.name}
        />
        <div className="profile-content float-left">
          <h1 className="name">{user.name}</h1>
          <h2 className="desc">{status}</h2>
          <ul className="social list-inline">
            {social && social.twitter && (
              <a href={social.twitter} target="blank">
                <li className="list-inline-item">
                  <i className="fab fa-twitter" />
                </li>
              </a>
            )}
            {social && social.facebook && (
              <a href={social.twitter} target="blank">
                <li className="list-inline-item">
                  <i className="fab fa-google-plus-g" />|
                </li>
              </a>
            )}
            {social && social.linkedin && (
              <a href={social.linkedin} target="blank">
                <li className="list-inline-item">
                  <i className="fab fa-linkedin-in" />
                </li>
              </a>
            )}
            {githubusername && (
              <a href={`http://github.com/${githubusername}`} target="blank">
                <li className="list-inline-item">
                  <i className="fab fa-github-alt" />
                </li>
              </a>
            )}
            {social && social.instagram && (
              <a href={social.instagram} target="blank">
                <li className="list-inline-item">
                  <i className="fab fa-instagram" />
                </li>
              </a>
            )}
          </ul>
        </div>
        <div>
          <a
            href={`mailto:${user.email}?subject=Mail from Dev-profile`}
            target="blank"
            class="btn btn-cta-primary float-right"
          >
            <i class="fas fa-paper-plane" /> Contact Me
          </a>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark float-right">
                Edit Profile
              </Link>
            )}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  profile: PropTypes.object.isRequired
};

export default Header;
