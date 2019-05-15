import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const Education = ({ education }) => {
  const { school, degree, from, to, current, fieldofstudy } = education;
  return (
    <div class="item">
      <h3 class="title">
        <i class="fas fa-graduation-cap" /> {fieldofstudy} {degree}
      </h3>
      <span class="title">
        {school}{" "}
        <span class="year">
          ( <Moment format="YYYY/MM/DD">{from}</Moment>-{" "}
          {current ? "Current" : <Moment format="YYYY/MM/DD">{to}</Moment>})
        </span>
      </span>
    </div>
  );
};

Education.propTypes = {
  education: PropTypes.object.isRequired
};

export default Education;
