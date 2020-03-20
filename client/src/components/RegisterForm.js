import React, { Component } from "react";
import { Formik } from "formik";
import { object, ref, string } from "yup";
import { Link } from "react-router-dom";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

export default class RegisterForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    formDetails: {}
  };

  render() {
    return (
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          password2: ""
        }}
        validationSchema={object().shape({
          name: string().required("Full name is required"),
          email: string().required("Email is required"),
          password: string()
            .required("New password is required")
            .min(6, "Too Short"),
          password2: string()
            .oneOf([ref("password")], "Passwords do not match")
            .required("Password is required")
        })}
        onSubmit={(
          { name, email, password, password2 },

          { setSubmitting, resetForm }
        ) => {
          this.setState({
            formDetails: {
              name: name,
              email: email,
              password: password,
              password2: password2
            }
          });
        }}
        render={props => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
            isSubmitting
          } = props;
          return isSubmitting ? (
            <>
              {console.log(this.state.formDetails)}

              {this.props.onSubmit(this.state.formDetails)}
            </>
          ) : (
            <Paper className="form form--wrapper" elevation={10}>
              <form className="form" onSubmit={handleSubmit}>
                <p className="h3 text-center mb-4">Register</p>
                <FormControl fullWidth margin="dense">
                  <InputLabel
                    htmlFor="name"
                    error={Boolean(touched.name && errors.name)}
                  >
                    {"Full Name"}
                  </InputLabel>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.name && errors.name)}
                  />
                  <FormHelperText error={Boolean(touched.name && errors.name)}>
                    {touched.name && errors.name ? errors.name : ""}
                  </FormHelperText>
                </FormControl>
                <FormControl fullWidth margin="dense">
                  <InputLabel
                    htmlFor="email"
                    error={Boolean(touched.email && errors.email)}
                  >
                    {"Email"}
                  </InputLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.email && errors.email)}
                  />
                  <FormHelperText
                    error={Boolean(touched.email && errors.email)}
                  >
                    {touched.email && errors.email ? errors.email : ""}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  fullWidth
                  margin="dense"
                  error={Boolean(touched.password && errors.password)}
                >
                  <InputLabel
                    htmlFor="password-new"
                    error={Boolean(touched.password && errors.password)}
                  >
                    {"New Password"}
                  </InputLabel>
                  <Input
                    id="password-new"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.password && errors.password)}
                  />
                  <FormHelperText
                    error={Boolean(touched.password && errors.password)}
                  >
                    {touched.password && errors.password ? errors.password : ""}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  fullWidth
                  margin="dense"
                  error={Boolean(touched.password2 && errors.password2)}
                >
                  <InputLabel
                    htmlFor="password-confirm"
                    error={Boolean(touched.password2 && errors.password2)}
                  >
                    {"Confirm Password"}
                  </InputLabel>
                  <Input
                    id="password-confirm"
                    name="password2"
                    type="password"
                    value={values.password2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.password2 && errors.password2)}
                  />
                  <FormHelperText
                    error={Boolean(touched.password2 && errors.password2)}
                  >
                    {touched.password2 && errors.password2
                      ? errors.password2
                      : ""}
                  </FormHelperText>
                </FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={Boolean(!isValid || isSubmitting)}
                  style={{
                    margin: "16px",
                    borderRadius: "10px",
                    marginTop: "50px",
                    color: "#fff"
                  }}
                >
                  {"Register"}
                </Button>

                <p className="text-center mb-4">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    style={{
                      color: "#39803e",
                      textDecoration: "none",
                      fontWeight: 900
                    }}
                  >
                    Login
                  </Link>
                </p>
              </form>
            </Paper>
          );
        }}
      />
    );
  }
}
