import React, { Component } from "react";
import Login from "./presenter";
import PropTypes from "prop-types";

class Container extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { isAuthenticated } = this.props.auth;
    //console.log(isAuthenticated);
    if (isAuthenticated) {
      this.props.history.push("./dashboard");
    }
  }

  getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors !== prevState.errors) {
      return { errors: nextProps.errors };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
    const { isAuthenticated } = this.props.auth;
    //console.log(isAuthenticated);
    if (isAuthenticated) {
      this.props.history.push("./dashboard");
    }
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { loginUser } = this.props;
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    loginUser(userData);
  };
  render() {
    //console.log(this.state.errors);
    return (
      <Login
        {...this.state}
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default Container;
