import React from 'react'
import { NavLink } from 'react-router-dom'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';

const Footer = () => {
    return (
        <footer id="footer">
    <div className="footer-top">
      <div className="container">
        <div className="row">

          <div className="col-lg-3 col-md-6 footer-info">
            <h3>Green Space Logistics</h3>
            <p>Moving the way you want.</p>
          </div>

          <div className="col-lg-3 col-md-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><ChevronRightIcon/> <NavLink to='/home'>Home</NavLink></li>
              <li><ChevronRightIcon/> <NavLink to='/about'>About us</NavLink></li>
              <li><ChevronRightIcon/> <NavLink to="/">Terms of service</NavLink></li>
              <li><ChevronRightIcon/> <NavLink to="/">Privacy policy</NavLink></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 footer-contact">
            <h4>Contact Us</h4>
            <p>
              Gwarko,Lalitpur <br />
              Kathmandu Valley 44600<br />
              Nepal <br />
              <strong>Phone:</strong> +9779862244150<br />
              <strong>Email:</strong> info@gsl.com<br />
            </p>

            <div className="social-links">
              <a href="" className="facebook"><FacebookIcon /></a>
              <a href="" className="instagram"><InstagramIcon /></a>
              <a href="" className="google-plus"><LinkedInIcon /></a>
              <a href="" className="linkedin"><TwitterIcon /> </a>
            </div>

          </div>

          <div className="col-lg-3 col-md-6 footer-newsletter">
            <h4>Our Newsletter</h4>
            <p>Join us at our <a href="https://damarugroup.blogspot.com" target="_blank" className="blogStyle">blog</a> for insights on interesting topics and such.</p>
            {/* <form action="" method="post">
              <input type="email" name="email"/><br/>
              <input type="submit"  value="Subscribe" />
            </form> */}
          </div>

        </div>
      </div>
    </div>


  </footer>
    )
}
export default Footer;
