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
import Image1 from "../../assets/img-01.png";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
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
    console.log(this.props);
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
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-pic js-tilt" data-tilt>
              <img src={Image1} alt="IMG" />
            </div>
            <form className="login100-form validate-form">
              <span className="login100-form-title">Member Login</span>
              <div
                className="wrap-input100 validate-input"
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  className="input100"
                  type="text"
                  name="email"
                  placeholder="Email"
                />
                <span className="focus-input100" />
                <span className="symbol-input100">
                  <i className="fa fa-envelope" aria-hidden="true" />
                </span>
              </div>
              <div
                className="wrap-input100 validate-input"
                data-validate="Password is required"
              >
                <input
                  className="input100"
                  type="password"
                  name="pass"
                  placeholder="Password"
                />
                <span className="focus-input100" />
                <span className="symbol-input100">
                  <i className="fa fa-lock" aria-hidden="true" />
                </span>
              </div>
              <div className="container-login100-form-btn">
                <button className="login100-form-btn">Login</button>
              </div>
              <div className="forget">
                <Link className="txt1" to="#">
                  Forgot Password?
                </Link>
              </div>
              <div className="create">
                <Link className="txt1" to="/register">
                  Create your Account <ArrowRightAltIcon />
                </Link>
              </div>
            </form>
          </div>
        </div>
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
