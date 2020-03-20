import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import Image1 from "../../assets/img-01.png";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import classnames from "classnames";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/profile");
    }
    console.log(this.props);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login1001">
            <div className="login1001-pic js-tilt" data-tilt>
              <img src={Image1} alt="IMG" />
            </div>
            <form className="login100-form validate-form">
              <span className="login100-form-title">Member Register</span>
              <div
                className="wrap-input100 validate-input"
                data-validate="Name is required"
              >
                <input
                  className="input100"
                  type="text"
                  name="name"
                  placeholder="Full Name"
                />
                <span className="focus-input100" />
                <span className="symbol-input100">
                  <i className="fa fa-user" aria-hidden="true" />
                </span>
              </div>
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
              <div className="wrap-input100 validate-input">
                <input
                  className="input100"
                  type="password"
                  name="pass2"
                  placeholder="Confirm Password"
                />
                <span className="focus-input100" />
                <span className="symbol-input100">
                  <i className="fa fa-lock" aria-hidden="true" />
                </span>
              </div>
              <div className="container-login100-form-btn">
                <button className="login100-form-btn">Register</button>
              </div>
              <div className="create">
                <Link className="txt1" to="/login">
                  Already have an Account? <ArrowRightAltIcon />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
