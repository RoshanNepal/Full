import React, { Component } from "react";
import TopNavbar from "../../components/TopNavbar";
import Loremtest from "../../components/Loremtest";
import Footer from "../../components/Footer";
import TestForm from "../../components/TestForm";
export default class Home extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <>
        <div className="container-fluid ">
          <Loremtest />
        </div>
      </>
    );
  }
}
