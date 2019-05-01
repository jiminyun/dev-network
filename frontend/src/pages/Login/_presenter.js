import React from "react";
import TextFieldGrp from "components/common/TextFieldGrp";

const Presenter = props => {
  const { email, password, errors, handleSubmit, handleInputChange } = props;

  return (
    <>
      {/* <div className="alert alert-danger">Invalid credentials</div> */}
      <h1 className="large">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user" /> Sign into Your Account
      </p>
      <form className="form" action="dashboard.html">
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            required
          />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" name="password" />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <a href="register.html">Sign Up</a>
      </p>
    </>
  );
};

export default Presenter;
