import React, { Component } from "react";
import PropTypes from "prop-types";
import Register from "./presenter";

class container extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  static propTypes = {
    registerUser: PropTypes.func.isRequired,
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
    //console.log(this.state.errors);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, email, password, password2 } = this.state;
    const newUser = {
      name,
      email,
      password,
      password2
    };

    const { registerUser } = this.props;
    registerUser(newUser, this.props.history);
  };

  render() {
    //console.log(this.state);
    return (
      <Register
        {...this.state}
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default container;
