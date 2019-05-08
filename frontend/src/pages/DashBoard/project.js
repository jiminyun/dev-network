import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import profileActions from "reducers/profile/actions";

const Project = ({ project, deleteProject }) => {
  const projects = project.map(prj => (
    <tr key={prj._id}>
      <td>{prj.title}</td>
      <td>
        <img src={prj.thumbnail} alt={prj.title} />
      </td>
      <td className="hide-sm">{prj.description}</td>
      <td className="hide-sm">{prj.techs}</td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => deleteProject(prj._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <h6>Projects</h6>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th />
            <th className="hide-sm">description</th>
            <th>Techs</th>
            <th />
          </tr>
        </thead>
        <tbody>{projects}</tbody>
      </table>
    </>
  );
};

Project.propTypes = {
  project: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  deleteProject: prj_id => dispatch(profileActions.deleteProject(prj_id))
});

export default connect(
  null,
  mapDispatchToProps
)(Project);
