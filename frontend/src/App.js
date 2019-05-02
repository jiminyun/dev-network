import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Components
import Footer from "components/layout/Footer";
import Landing from "components/layout/Landing";
import Register from "pages/Register/";
import Login from "pages/Login";
import Dashboard from "pages/Dashboard";
import PrivateRoute from "components/routing/PrivateRoute";
import Profile from "pages/Profiles";
import CreateProfile from "pages/CreateProfile";
import EditProfile from "pages/EditProfile";
import Alert from "components/layout/Alert";
import "assets/styles/App.css";
// Redux
import { Provider } from "react-redux";
import store from "./reducers/store";
import authActions from "./reducers/auth/actions";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(authActions.loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Route exact path="/" component={Landing} />
          <Route exact path="/profiles" component={Profile} />
          <section className="container">
            <Alert />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
            </Switch>
          </section>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
