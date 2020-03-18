import React, { Component } from "react";
import { Formik } from "formik";
import { object, ref, string } from "yup";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

export default class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    loginDetails: {}
  };

  render() {
    return (
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validationSchema={object().shape({
          email: string().required("Email is required"),
          password: string()
            .required("New password is required")
            .min(6, "Too Short")
        })}
        onSubmit={(
          { email, password },

          { setSubmitting, resetForm }
        ) => {
          this.setState({
            loginDetails: {
              email: email,
              password: password
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
              {console.log(this.state.loginDetails)}

              {this.props.onSubmit(this.state.loginDetails)}
            </>
          ) : (
            <Paper className="form form--wrapper" elevation={10}>
              <h1>Login</h1>
              <form className="form" onSubmit={handleSubmit}>
                <FormControl fullWidth margin="none">
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
                    {touched.email && errors.email ? (
                      <div> {errors.email} </div>
                    ) : (
                      ""
                    )}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  fullWidth
                  margin="none"
                  error={Boolean(touched.password && errors.password)}
                >
                  <InputLabel
                    htmlFor="password"
                    error={Boolean(touched.password && errors.password)}
                  >
                    {"New Password"}
                  </InputLabel>
                  <Input
                    id="password"
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
                    {touched.password && <div> {errors.password} </div>
                      ? errors.password
                      : ""}
                  </FormHelperText>
                </FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={Boolean(!isValid || isSubmitting)}
                  style={{
                    margin: "16px",
                    borderRadius: "10px",
                    marginTop: "50px",
                    color: "#fff"
                  }}
                >
                  {"Login"}
                </Button>
              </form>
            </Paper>
          );
        }}
      />
    );
  }
}
