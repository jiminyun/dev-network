import React from "react";
import TextFieldGrp from "components/common/TextFieldGrp";

const Presenter = props => {
  const { email, password, errors, handleSubmit, handleInputChange } = props;

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">
              Sign in to your DevConnector account
            </p>
            <form noValidate onSubmit={handleSubmit}>
              <TextFieldGrp
                placeholder="Email Address"
                name="email"
                type="email"
                value={email}
                onChange={handleInputChange}
                error={errors.email}
              />
              <TextFieldGrp
                placeholder="Password"
                name="password"
                type="password"
                value={password}
                onChange={handleInputChange}
                error={errors.password}
              />
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presenter;
