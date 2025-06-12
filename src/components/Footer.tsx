import React from 'react';
import Logo from '../assets/footer-logo.png';
import { Link } from 'react-router-dom';
import mailIcon from '../assets/mail-white.png';
import facebookIcon from '../assets/facebook-white.png';
import instagramIcon from '../assets/instagram-white.png';
import twitterIcon from '../assets/twitterx-white.png';

const Footer = () => {
  return (
    <>
      {/* Main Footer Overlay */}
      <div className='footer-overlay'>
        <div
          className='footer-content'
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between'
          }}
        >
          {/* Contact */}
          <div className='footer-section'>
            <h4>Contact</h4>
            <Link to="/"><img src={Logo} alt="Logo" className="footer-logo" /></Link>
            <p>Email us: support@bestcaststudios.com</p>
          </div>

          {/* Quick Links */}
          <div className='footer-section'>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/my-account">My Account</Link></li>
              <li><Link to="/help">Help & Support</Link></li>
              <li><Link to="/policy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Pages */}
          <div className='footer-section'>
            <h4>Pages</h4>
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
            </ul>
          </div>

          {/* Address with Social Icons */}
          <div className='footer-section'>
            <h4>Address</h4>
            <p>Flat - E, 2nd floor, Gilli Flower,</p>
            <p>Old no-46, New no - 6, 23rd Street, L- Block,</p>
            <p>Anna Nagar East, Chennai - 600 102</p>
            <div className="social-icons" style={{ marginTop: '15px', display: 'flex', gap: '15px' }}>
              <img src={facebookIcon} alt="Facebook" className="social-icon" />
              <img src={instagramIcon} alt="Instagram" className="social-icon" />
              <img src={twitterIcon} alt="Twitter" className="social-icon" />
              <img src={mailIcon} alt="Mail" className="social-icon" />
            </div>
          </div>
        </div>
      </div>

      {/* Second Footer Below */}
      <div
        className="footer-second">
        © 24 BESTCAST METAVERSE LIMITED. All Rights Reserved.
      </div>
    </>
  );
};

export default Footer;
