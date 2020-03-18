import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
class NavigationOptions extends Component {
  constructor() {
    super();
    this.state = {
      navLoginCheck: false
    };
  }
  componentDidMount() {
    console.log(this.props);
    if (this.props.auth.isAuthenticated) {
      this.setState({
        navLoginCheck: true
      });
    }
  }

  render() {
    return (
      <div className="navigation-links container">
        <div className="nav-options">
          <NavLink
            to="/home"
            onClick={() => this.props.closeClick()}
            className="nav-link"
          >
            <h1>Home</h1>
          </NavLink>
        </div>
        <div className="nav-options">
          <NavLink
            to="/about"
            onClick={() => this.props.closeClick()}
            className="nav-link"
          >
            <h1>About</h1>
          </NavLink>
        </div>

        <div className="nav-options">
          <NavLink
            to="/contact"
            onClick={() => this.props.closeClick()}
            className="nav-link"
          >
            <h1>Contact</h1>
          </NavLink>
        </div>
        {!this.state.navLoginCheck && (
          <div className="nav-options">
            <NavLink
              to="/login"
              onClick={() => this.props.closeClick()}
              className="nav-link"
            >
              <h1>Login</h1>
            </NavLink>
          </div>
        )}
        {!this.state.navLoginCheck && (
          <div className="nav-options">
            <NavLink
              to="/register"
              onClick={() => this.props.closeClick()}
              className="nav-link"
            >
              <h1>Register</h1>
            </NavLink>
          </div>
        )}
        {this.state.navLoginCheck && (
          <div className="nav-options">
            <NavLink
              to="/profile"
              onClick={() => this.props.closeClick()}
              className="nav-link"
            >
              <h1>Profile</h1>
            </NavLink>
          </div>
        )}
        {this.state.navLoginCheck && (
          <div className="nav-options">
            <NavLink
              to="#"
              onClick={() => this.props.logoutUser()}
              className="nav-link"
            >
              <h1>Logout</h1>
            </NavLink>
          </div>
        )}
      </div>
    );
  }
}
NavigationOptions.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(NavigationOptions);
