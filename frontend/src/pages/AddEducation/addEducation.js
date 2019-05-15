import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    degree: "",
    school: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });
  const [toDataDisabled, toggleDisabled] = useState(false);
  const {
    degree,
    school,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    setFormData({
      ...formData,
      description: description.replace(/(\n|\r\n)/g, "<br>")
    });
    //console.log(formData);
    addEducation(formData, history);
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
              <h1 className="display-4 text-center">Add Your Education</h1>
              <p className="lead text-center">
                Add any developer/programming positions that you have had in the
                past
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="* School or Bootcamp"
                    name="school"
                    value={school}
                    onChange={e => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="* Degree or Certificate"
                    name="degree"
                    value={degree}
                    onChange={e => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Field of Study"
                    value={fieldofstudy}
                    onChange={e => onChange(e)}
                    name="fieldofstudy"
                  />
                </div>
                <h6>From Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    value={from}
                    onChange={e => onChange(e)}
                    name="from"
                  />
                </div>
                <h6>To Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    value={to}
                    onChange={e => onChange(e)}
                    name="to"
                    disabled={toDataDisabled ? "disabled" : ""}
                  />
                </div>
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="current"
                    value={current}
                    checked={current}
                    onChange={e => {
                      setFormData({ ...formData, current: !current });
                      toggleDisabled(!toDataDisabled);
                    }}
                    id="current"
                  />
                  <label className="form-check-label">Current School</label>
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Program Description"
                    name="description"
                    value={description}
                    onChange={e => onChange(e)}
                  />
                  <small className="form-text text-muted">
                    Some of your responsibilities, etc
                  </small>
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
