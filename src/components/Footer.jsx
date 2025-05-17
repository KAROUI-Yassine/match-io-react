import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for internal navigation if needed

const Footer = () => {
  return (
    <footer className="section footer-section">
      <div className="footer-content">
        <div className="footer-logo">match<span>.io</span></div>
        <div className="footer-links">
          <div className="link-group">
            <h4>Competitions</h4>
            <ul>
              <li><a href="#">Current Tournaments</a></li>
              <li><a href="#">Upcoming Events</a></li>
              <li><a href="#">Past Results</a></li>
            </ul>
          </div>
          <div className="link-group">
            <h4>Community</h4>
            <ul>
              <li><a href="#">Leaderboards</a></li>
              <li><a href="#">Teams</a></li>
              <li><a href="#">Forums</a></li>
            </ul>
          </div>
          <div className="link-group">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Sponsorships</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 match.io - All rights reserved</p>
        <div className="social-links">
          <a href="https://www.twitch.tv/" target="_blank" rel="noopener noreferrer">Twitch</a>
          <a href="https://x.com/home" target="_blank" rel="noopener noreferrer">X</a>
          <a href="https://discord.com/" target="_blank" rel="noopener noreferrer">Discord</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;