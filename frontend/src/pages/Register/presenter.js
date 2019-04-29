import React from "react";
import TextFieldGrp from "components/common/TextFieldGrp";

const Presenter = props => {
  const {
    name,
    email,
    password,
    password2,
    errors,
    handleSubmit,
    handleInputChange
  } = props;

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your DevConnector account</p>
            <form noValidate onSubmit={handleSubmit}>
              <TextFieldGrp
                placeholder="Name"
                name="name"
                value={name}
                onChange={handleInputChange}
                error={errors.name}
              />
              <TextFieldGrp
                placeholder="Email Address"
                name="email"
                type="email"
                value={email}
                onChange={handleInputChange}
                error={errors.email}
                info="This site uses Gravatar so if you want a profile image, use a Gravatar"
              />
              <TextFieldGrp
                placeholder="Password"
                name="Password"
                type="Password"
                value={password}
                onChange={handleInputChange}
                error={errors.password}
              />
              <TextFieldGrp
                placeholder="Confirm Password"
                name="Password2"
                type="Password"
                value={password2}
                onChange={handleInputChange}
                error={errors.password2}
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
