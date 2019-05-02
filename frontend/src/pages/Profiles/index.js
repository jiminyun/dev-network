import React from "./node_modules/react";
import { Link } from "./node_modules/react-router-dom";

export default function Profile() {
  return (
    <header className="header">
      <div className="container clearfix">
        <img
          className="profile-image img-fluid float-left"
          src={require("../../assets/images/profile.png")}
          alt="James Lee"
        />
        <div className="profile-content float-left">
          <h1 className="name">James Lee</h1>
          <h2 className="desc">Web App Developer</h2>
          <ul className="social list-inline">
            <li className="list-inline-item">
              <i className="fab fa-twitter" />
            </li>
            <li className="list-inline-item">
              <i className="fab fa-google-plus-g" />|
            </li>
            <li className="list-inline-item">
              <i className="fab fa-linkedin-in" />
            </li>
            <li className="list-inline-item">
              <i className="fab fa-github-alt" />
            </li>
            <li className="list-inline-item">
              <i className="fab fa-stack-overflow" />
            </li>
            <li className="list-inline-item last-item">
              <i className="fab fa-codepen" />
            </li>
          </ul>
        </div>
        <a
          class="btn btn-cta-primary float-right"
          href="https://themes.3rdwavemedia.com/"
          target="_blank"
        >
          <i class="fas fa-paper-plane" /> Contact Me
        </a>
      </div>
    </header>
  );
}
