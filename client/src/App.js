import React, { Component } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Contact from "./pages/Contact/Contact";
import SplashScreen from "./pages/SplashScreen/SplashScreen";
import Resend from "./pages/Resend/Resend";
import PrivateRoute from "./components/private-route/PrivateRoute";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import Profile from "./pages/Profile/Profile";
import TopNavbar from "./components/TopNavbar";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import store from "./store";
import { decodeBase64 } from "bcryptjs";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds

  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router>
            <div className="header">
              <TopNavbar />
            </div>
            <Switch>
              <Route exact path="/" component={SplashScreen} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/resend" component={Resend} />
              <PrivateRoute exact path="/profile" component={Profile} />
            </Switch>
            <div className="footer">
              <Footer />
            </div>
          </Router>
        </Provider>
      </div>
    );
  }
}
