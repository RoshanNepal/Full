import React, { Component } from "react";

export default class Resend extends Component {
  state = {
    test: false
  };
  componentDidMount() {
    // console.log(this.props.location.state.detail);
    console.log(this.props);
  }
  render() {
    if (typeof this.props.location.state != "undefined") {
      return <h1>Resend Page</h1>;
    } else {
      return (
        <div>
          <h1>You can't do that bitch!</h1>
        </div>
      );
    }
  }
}
