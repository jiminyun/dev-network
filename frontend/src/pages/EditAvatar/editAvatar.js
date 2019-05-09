import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const EditAvatar = ({ user, loading, updateAvatar }) => {
  const [avatar, setFormData] = useState(null);

  //const { avatar } = formData;

  const onChange = e => setFormData(e.target.files[0]);

  const onSubmit = e => {
    e.preventDefault();
    updateAvatar(avatar);
  };
  return (
    <>
      <h1 className="large text-primary">Edit Your Avatar</h1>
      <img
        className="avatar"
        src={user && user.avatar ? user.avatar : ""}
        alt="avatar"
        width="40px"
      />
      <p className="lead">
        <i className="fas fa-user" /> Let's put your professional picture
      </p>

      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="file"
            placeholder="avatar"
            name="avatar"
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
};
EditAvatar.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

export default EditAvatar;
