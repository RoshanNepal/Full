import React, { Component } from "react";
import RegisterForm from "../../components/RegisterForm";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { green } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: green
  }
});
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
      clicky: false
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/profile");
    }
  }
  componentWillReceiveProps(nextProps) {
    const { errors } = this.state;
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = formDetails => {
    const { errors } = this.state;
    console.log("asd");
    console.log(formDetails);
    this.props.registerUser(formDetails, this.props.history);
    if (Object.keys(errors).length === 0) {
      console.log("error is empty");
      this.setState({ clicky: true });
    } else {
      console.log("there are errors");
      console.log("value");
    }
  };
  renderResendCode = () => {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-4">
          <h1>Hello</h1>
        </div>
      </div>
    );
  };
  renderRegisterForm = () => {
    return (
      <div className="loginformcontainer">
        <MuiThemeProvider theme={theme}>
          <CssBaseline>
            <RegisterForm onSubmit={this.onSubmit} />
          </CssBaseline>
        </MuiThemeProvider>
      </div>
    );
  };
  render() {
    const { errors, clicky } = this.state;
    console.log(clicky, errors);
    {
      if (errors.email == "Email already exists") {
        return (
          <>
            <h1>Email already exists.</h1>
            <Link to="/login">Login Here</Link>
          </>
        );
      }
    }

    return (
      <>
        {!clicky && this.renderRegisterForm()}
        {clicky && this.renderResendCode()}
      </>
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
