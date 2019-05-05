import React from "react";
import PropTypes from "prop-types";

const AboutMe = ({ bio }) => {
  return (
    <section class="about section">
      <div class="section-inner">
        <h2 class="heading">About Me</h2>
        <div class="content">
          <p>{bio}</p>
        </div>
      </div>
    </section>
  );
};

AboutMe.propTypes = {
  bio: PropTypes.string.isRequired
};

export default AboutMe;
