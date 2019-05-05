import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const Experience = ({ experience }) => {
  const { company, location, current, from, to, description } = experience;
  return (
    <div class="item">
      <h3 class="title">
        {experience.title} -{" "}
        <span class="place">
          {/* <a href="#"> */}
          {company} {location}
          {/* </a> */}
        </span>{" "}
        <span class="year">
          ( <Moment format="YYYY/MM/DD">{from}</Moment>-{" "}
          {current ? "Current" : <Moment format="YYYY/MM/DD">{to}</Moment>})
        </span>
      </h3>
      <p>{description}</p>
    </div>
  );
};

Experience.propTypes = {
  experience: PropTypes.object.isRequired
};

export default Experience;
