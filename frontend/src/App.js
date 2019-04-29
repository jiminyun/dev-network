import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "utils/setAuthToken";
import { setCurrentUser } from "reducers/auth/actions";
import { Provider } from "react-redux";
import store from "./reducers/store";

import Footer from "components/layout/Footer";
import Landing from "components/layout/Landing";
import Register from "pages/Register/";
import Login from "pages/Login";
import Profile from "pages/Profiles";

import "assets/styles/App.css";

const App = () => {
  // Check for token
  if (localStorage.jwtToken) {
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
  }
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Route exact path="/" component={Landing} />
          <Route exact path="/profiles" component={Profile} />
          <div className="wrapper">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
