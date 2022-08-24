import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
    <footer>
            <div className="footer-b">
            <div className="container">
                <div className="footer-top">
                    <div className="footer-top-innr text-center">
                        <p>Subscribe to our newsletter</p>
                    </div>
                     <div className="footer-top-innr">
                        <form>
                         <input type="email" placeholder="Enter your email address"/>
                         <input type="submit" value="Sign Up"/>
                         </form>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="row">
                        <div className="col-lg-3 col-sm-3">
                            <div className="footer-bottom-innr">
                                <h3>user links</h3>
                                <ul>
                                    <div className="row">
                                        <div className="col-lg-12 col-sm-12 col-xs-6 pay-space">
                                            <li><Link to="/">Returns</Link></li>
                                            <li><Link to="/faq">F.A.Q</Link></li>
                                            <li><Link to="/support">Support</Link></li>
                                    </div>
                                    </div>
                                </ul>
                                <div className="social-icon">
                                    <h3>Follow Us</h3>
                                    <ul>
                                        <li><Link to="/"><i className="fa fa-facebook" aria-hidden="true"></i></Link></li>
                                        <li><Link to="/"><i className="fa fa-instagram" aria-hidden="true"></i></Link></li>
                                        <li><Link to="/"><i className="fa fa-youtube-play" aria-hidden="true"></i></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                         <div className="col-lg-3 col-sm-3">
                            <div className="footer-bottom-innr">
                                <h3>Products</h3>
                                <ul>
                                    <div className="row">
                                        <div className="col-lg-12 col-sm-12 col-xs-6">
                                            <li><Link to="">Outdoorboxes</Link></li>
                                            <li><Link to="">Batteries</Link></li>
                                            <li><Link to="">Battery Chargers</Link></li>
                                        </div>
                                        <div className="col-lg-12 col-sm-12 col-xs-6 pay-space">
                                            <li><Link to="">Accessories</Link></li>
                                            <li><Link to="">Fishing Packages</Link></li>
                                            <li><Link to="">Other Products</Link></li>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-3">
                            <div className="footer-bottom-innr">
                                <h3>Quick Links</h3>
                                <ul>
                                    <div className="row">
                                        <div className="col-lg-12 col-sm-12 col-xs-6">
                                            <li><Link to="/about">About</Link></li>
                                            <li><Link to="/shop">Shop</Link></li>
                                            <li><Link to="/target">target</Link></li>
                                            
                                        </div>
                                        <div className="col-lg-12 col-sm-12 col-xs-6 pay-space">
                                            <li><Link to="/news">News</Link></li>
                                            <li><Link to="">Resources</Link></li>
                                            <li><Link to="/contact">Contact</Link></li>
                                            
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div>
                      
                    </div>
                </div>
            </div>
            </div>
            <div className="footer-h text-center">
                <div className="container">
                    <p>© {new Date().getFullYear()} <Link to="/">Rebelcell </Link> BV. All Rights Reserved. Sitemap | <Link to="/"> Terms & Conditions </Link></p>
                </div>
            </div>
        </footer>
    </>
  )
}

export default Footer;