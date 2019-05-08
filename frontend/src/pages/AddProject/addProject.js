import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const AddEducation = ({ addProject, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    github: "",
    thumbnail: "",
    video: "",
    techs: ""
  });

  const { title, description, github, techs } = formData;

  const onChange = e => {
    e.target.type === "file"
      ? setFormData({ ...formData, [e.target.name]: e.target.files[0] })
      : setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault(formData);
    console.log(formData);
    addProject(formData, history);
  };
  return (
    <>
      <div className="section add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Project</h1>
              <p className="lead text-center">
                Add any projects that you have had in the past
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="* Project Title"
                    name="title"
                    value={title}
                    onChange={e => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Github"
                    value={github}
                    onChange={e => onChange(e)}
                    name="github"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Tech"
                    value={techs}
                    onChange={e => onChange(e)}
                    name="techs"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="file"
                    className="form-control form-control-lg"
                    placeholder="Image"
                    onChange={e => onChange(e)}
                    name="thumbnail"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="file"
                    className="form-control form-control-lg"
                    placeholder="Video"
                    onChange={e => onChange(e)}
                    name="video"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Program Description"
                    name="description"
                    value={description}
                    onChange={e => onChange(e)}
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
};

export default AddEducation;
