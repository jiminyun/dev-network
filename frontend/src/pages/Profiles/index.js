import React from "react";

export default function Profile() {
  return (
    <header class="header">
      <div class="container clearfix">
        <img
          class="profile-image img-fluid float-left"
          src={require("../../assets/images/profile.png")}
          alt="James Lee"
        />
        <div class="profile-content float-left">
          <h1 class="name">James Lee</h1>
          <h2 class="desc">Web App Developer</h2>
          <ul class="social list-inline">
            <li class="list-inline-item">
              <a href="#">
                <i class="fab fa-twitter" />
              </a>
            </li>
            <li class="list-inline-item">
              <a href="#">
                <i class="fab fa-google-plus-g" />
              </a>
            </li>
            <li class="list-inline-item">
              <a href="#">
                <i class="fab fa-linkedin-in" />
              </a>
            </li>
            <li class="list-inline-item">
              <a href="#">
                <i class="fab fa-github-alt" />
              </a>
            </li>
            <li class="list-inline-item">
              <a href="#">
                <i class="fab fa-stack-overflow" />
              </a>
            </li>
            <li class="list-inline-item last-item">
              <a href="#">
                <i class="fab fa-codepen" />
              </a>
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
