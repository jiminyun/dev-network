import React, { useState } from "react";
import { Link } from "react-router-dom";
//import PropTypes from "prop-types";

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });
  const [toDataDisabled, toggleDisabled] = useState(false);
  const { company, title, location, from, to, current, description } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    addExperience(formData, history);
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
              <h1 className="display-4 text-center">Add Your Experience</h1>
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
                    placeholder="* Job Title"
                    name="title"
                    value={title}
                    onChange={e => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="* Company"
                    name="company"
                    value={company}
                    onChange={e => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Location"
                    value={location}
                    onChange={e => onChange(e)}
                    name="location"
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
                  <label className="form-check-label">Current Job</label>
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Job Description"
                    name="description"
                    value={description}
                    onChange={e => onChange(e)}
                  />
                  <small className="form-text text-muted">
                    Some of your responsabilities, etc
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

AddExperience.propTypes = {};

export default AddExperience;
