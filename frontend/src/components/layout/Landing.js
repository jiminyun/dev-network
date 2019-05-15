import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Landing extends Component {
  render() {
    return (
      <section className="landing">
        {/* <div className="land-wrapper_"> */}
        <div className="landing-inner">
          <span className="xx-large">
            Profile <br /> Generator
          </span>
          <p className="lead">
            Create your online profile/portfolio in a simply way
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
        {/* </div> */}
      </section>
    );
  }
}
