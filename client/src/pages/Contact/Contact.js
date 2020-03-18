import React, { Component } from "react";
import TopNavbar from "../../components/TopNavbar";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import Footer from "../../components/Footer";
export default class Contact extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div>
        <section className="contact">
          <div className="container">
            <div className="section-header">
              <h3>Contact Us</h3>
              <p>
                Contact us with the details below or send us a message about any
                queries you might have so we can answer them ASAP.
              </p>
            </div>

            <div className="row contact-info">
              <div className="col-md-4">
                <div className="contact-address">
                  <div className="icon">
                    <LocationOnIcon fontSize="large" />
                  </div>
                  <h3>Address</h3>
                  <address>Gwarko, Lalitpur 44600, Nepal</address>
                </div>
              </div>

              <div className="col-md-4">
                <div className="contact-phone">
                  <div className="icon">
                    <PhoneIcon fontSize="large" />
                  </div>
                  <h3>Phone Number</h3>
                  <p>
                    <a href="tel:+9779862244150">+9779862244150</a>
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="contact-email">
                  <div className="icon">
                    <EmailIcon fontSize="large" />
                  </div>
                  <h3>Email</h3>
                  <p>
                    <a href="mailto:gsl@company.com">gsl@company.com</a>
                  </p>
                </div>
              </div>
            </div>
            {/* 
         <div className="form">
          <div id="sendmessage">Your message has been sent. Thank you!</div>
          <div id="errormessage"></div>
          <form action="" method="post" role="form" className="contactForm">
            <div className="form-row">
              <div className="form-group col-md-6">
                <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                <div className="validation"></div>
              </div>
              <div className="form-group col-md-6">
                <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
                <div className="validation"></div>
              </div>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
              <div className="validation"></div>
            </div>
            <div className="form-group">
              <textarea className="form-control" name="message" rows="5" data-rule="required" data-msg="Please write something for us" placeholder="Message"></textarea>
              <div className="validation"></div>
            </div>
            <div className="text-center"><button type="submit">Send Message</button></div>
          </form>
        </div>  */}
          </div>
        </section>
      </div>
    );
  }
}
