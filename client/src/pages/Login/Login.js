import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import classnames from "classnames";
import { green } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import axios from "axios";
const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: green
  }
});
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/profile");
    }
    // console.log(this.props);
    // fetch("http://localhost:5000/api/users/confirmation/:tokenId")
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/profile"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  getLoginData = (value, type) =>
    this.setState({
      [type]: value
    });
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    console.log(this.state.email);
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };
  render() {
    const { errors } = this.state;
    console.log(errors);
    if (errors.emailnotfound === "Email is not verified") {
      return <h1>Email not verified</h1>;
    }
    return (
      <div className="loginformcontainer">
        <Paper className="form form--wrapper" elevation={10}>
          <MDBCol md="6">
            <form onSubmit={this.onSubmit}>
              <p className="h5 text-center mb-4">Login</p>
              <div className="grey-text">
                <MDBInput
                  label="Email"
                  group
                  type="email"
                  validate
                  id="email"
                  onChange={this.onChange}
                  getValue={value => this.getLoginData(value, "email")}
                  error={errors.email}
                  error="wrong"
                  success="right"
                />

                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
                <MDBInput
                  label="Password"
                  group
                  type="password"
                  id="password"
                  isRequired
                  onChange={this.onChange}
                  getValue={value => this.getLoginData(value, "password")}
                  error={errors.email}
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                  validate
                />

                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div className="text-center">
                <MDBBtn type="submit" color="green" style={{ color: "#fff" }}>
                  Login
                </MDBBtn>
              </div>
            </form>
            <p className="h6 text-center mb-4">
              Don't have an account yet? <Link to="/register">Sign Up</Link>{" "}
              now.
            </p>
          </MDBCol>
        </Paper>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps, { loginUser })(Login);
