import React from 'react';
import { Link } from 'react-router-dom';
import { Umbrella, Instagram, Twitter, Facebook, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* Brand Section */}
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <Umbrella size={28} className="footer-logo-icon" />
                            <span className="footer-logo-text">Google Umbrella</span>
                        </Link>
                        <p className="footer-description">
                            Reimagining weather protection with technology and style.
                            The world's first smart umbrella designed for the modern life.
                        </p>
                        <div className="social-links">
                            <a href="#" aria-label="Instagram" className="social-link"><Instagram size={20} /></a>
                            <a href="#" aria-label="Twitter" className="social-link"><Twitter size={20} /></a>
                            <a href="#" aria-label="Facebook" className="social-link"><Facebook size={20} /></a>
                            <a href="#" aria-label="YouTube" className="social-link"><Youtube size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h3>Shop</h3>
                        <ul>
                            <li><Link to="/shop">All Umbrellas</Link></li>
                            <li><Link to="/shop?sort=newest">New Arrivals</Link></li>
                            <li><Link to="/shop">Accessories</Link></li>
                            <li><Link to="/shop">Gift Cards</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="footer-section">
                        <h3>Company</h3>
                        <ul>
                            <li><Link to="/">About Us</Link></li>
                            <li><Link to="/support">Sustainability</Link></li>
                            <li><Link to="/support">Careers</Link></li>
                            <li><Link to="/support">Press</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-section">
                        <h3>Contact</h3>
                        <ul className="contact-list">
                            <li>
                                <Mail size={16} />
                                <span>aswinphilipraju@gmail.com</span>
                            </li>
                            <li>
                                <Phone size={16} />
                                <span>+91 7736687371</span>
                            </li>
                            <li>
                                <MapPin size={16} />
                                <span>1600 Amphitheatre Pkwy<br />Mountain View, CA</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Aswin Philip Raju. All rights reserved.</p>
                    <div className="footer-legal">
                        <Link to="/support">Privacy Policy</Link>
                        <Link to="/support">Terms of Service</Link>
                        <Link to="/support">Cookie Settings</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
