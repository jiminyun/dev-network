import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Components
import Navibar from "components/layout/Navibar";
import Footer from "components/layout/Footer";
import Landing from "components/layout/Landing";
import Alert from "components/layout/Alert";
// Routes
import PrivateRoute from "components/routing/PrivateRoute";
import Register from "pages/Register/";
import Login from "pages/Login";
import Dashboard from "pages/Dashboard";
import CreateProfile from "pages/CreateProfile";
import EditProfile from "pages/EditProfile";
import AddExperience from "pages/AddExperience";
import AddEducation from "pages/AddEducation";
import AddProject from "pages/AddProject";
import Profile from "pages/Profile";
import Profiles from "pages/Profiles";
import EditAvatar from "pages/EditAvatar";

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
          <Navibar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/profile/:id" component={Profile} />
          <section className="container">
            <Alert />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <PrivateRoute exact path="/edit-avatar" component={EditAvatar} />
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
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
              <PrivateRoute exact path="/add-project" component={AddProject} />
            </Switch>
          </section>
          {/* <Footer /> */}
        </div>
      </Router>
    </Provider>
  );
};

export default App;
