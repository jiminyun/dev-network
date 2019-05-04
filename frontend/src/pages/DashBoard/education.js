import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import profileActions from "reducers/profile/actions";

const Education = ({ education, deleteEducation }) => {
  const educations = education.map(edu => (
    <tr key={edu._id}>
      <td className="hide-sm">{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
        {edu.to === null ? (
          " Now"
        ) : (
          <Moment format="YYYY/MM/DD">{edu.to}</Moment>
        )}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => deleteEducation(edu._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <h6>Educations Credentials</h6>
      <table className="table">
        <thead>
          <tr>
            <th>School----</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Year</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired
};

const mapDispatchToProps = dispatch => ({
  deleteEducation: edu_id => dispatch(profileActions.deleteEducation(edu_id))
});

export default connect(
  null,
  mapDispatchToProps
)(Education);
