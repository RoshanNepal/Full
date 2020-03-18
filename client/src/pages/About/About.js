import React, { Component } from "react";
import TopNavbar from "../../components/TopNavbar";
import AboutMission from "../../assets/about-mission.jpg";
import AboutPlan from "../../assets/about-plan.jpg";
import AboutVision from "../../assets/about-vision.jpg";
import SpeedIcon from "@material-ui/icons/Speed";
import ListIcon from "@material-ui/icons/List";
import AssignmentIcon from "@material-ui/icons/Assignment";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Footer from "../../components/Footer";
export default class About extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <>
        <section className="about">
          <div className="container">
            <header className="section-header about-section">
              <h3>About Us</h3>
              <p>
                Moving someplace new ? Need to move stuff ? We help you do that.
              </p>
            </header>

            <div className="row about-cols">
              <div className="col-md-4 wow fadeInUp">
                <div className="about-col">
                  <div className="img">
                    <img src={AboutMission} alt="" className="img-fluid" />
                    <div className="icon">
                      <SpeedIcon fontSize="large" />
                    </div>
                  </div>
                  <h2 className="title">Our Mission</h2>
                  <p>
                    To provide an easy and convenient method of moving your
                    stuff with a service tailored to your needs.
                  </p>
                </div>
              </div>

              <div className="col-md-4 wow fadeInUp" data-wow-delay="0.1s">
                <div className="about-col">
                  <div className="img">
                    <img src={AboutPlan} alt="" className="img-fluid" />
                    <div className="icon">
                      <AssignmentIcon fontSize="large" />
                    </div>
                  </div>
                  <h2 className="title">Our Plan</h2>
                  <p>
                    To use technology to provide a fast and efficient service
                    saving you your time and money.
                  </p>
                </div>
              </div>

              <div className="col-md-4 wow fadeInUp" data-wow-delay="0.2s">
                <div className="about-col">
                  <div className="img">
                    <img src={AboutVision} alt="" className="img-fluid" />
                    <div className="icon">
                      <VisibilityIcon fontSize="large" />
                    </div>
                  </div>
                  <h2 className="title">Our Vision</h2>
                  <p>
                    To establish a service that you can access from anywhere and
                    at anytime to fulfill your moving desires.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}
