import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const SplashScreen = props => {
  setTimeout(() => {
    props.history.push("/home");
  }, 1000);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh"
      }}
    >
      <CircularProgress />
    </div>
  );
};
export default SplashScreen;
