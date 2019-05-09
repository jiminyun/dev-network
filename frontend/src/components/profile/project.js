import React from "react";
import PropTypes from "prop-types";

const Experience = ({ project }) => {
  const { title, description, thumbnail, github } = project;
  return (
    <div class="item row">
      <a class="col-md-4 col-12" href="#!">
        <img class="img-fluid project-image" src={thumbnail} alt={title} />
      </a>
      <div class="desc col-md-8 col-12">
        <h3 class="title">{title}</h3>
        <p class="mb-2">{description}</p>
        <p>
          <i class="fas fa-external-link-alt" />
          <a href={github} target="blank">
            github
          </a>
        </p>
      </div>
    </div>
  );
};

Experience.propTypes = {
  experience: PropTypes.object.isRequired
};

export default Experience;
