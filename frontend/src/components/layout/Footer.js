import React from 'react';

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
                                        <div className="col-lg-12 col-sm-12 col-xs-6">
                                            <li><a href="">My Account</a></li>
                                            <li><a href="">Pay</a></li>
                                            <li><a href="">Shipping</a></li>
                                        </div>
                                        <div className="col-lg-12 col-sm-12 col-xs-6 pay-space">
                                            <li><a href="">Returns</a></li>
                                            <li><a href="">F.A.Q</a></li>
                                            <li><a href="">Support</a></li>
                                    </div>
                                    </div>
                                </ul>
                                <div className="social-icon">
                                    <h3>Follow Us</h3>
                                    <ul>
                                        <li><a href=""><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                                        <li><a href=""><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                                        <li><a href=""><i className="fa fa-youtube-play" aria-hidden="true"></i></a></li>
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
                                            <li><a href="">Outdoorboxes</a></li>
                                            <li><a href="">Batteries</a></li>
                                            <li><a href="">Battery Chargers</a></li>
                                        </div>
                                        <div className="col-lg-12 col-sm-12 col-xs-6 pay-space">
                                            <li><a href="">Accessories</a></li>
                                            <li><a href="">Fishing Packages</a></li>
                                            <li><a href="">Other Products</a></li>
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
                                            <li><a href="">About</a></li>
                                            <li><a href="">Shop</a></li>
                                            <li><a href="">target</a></li>
                                            
                                        </div>
                                        <div className="col-lg-12 col-sm-12 col-xs-6 pay-space">
                                            <li><a href="">News</a></li>
                                            <li><a href="">Resources</a></li>
                                            <li><a href="">Contact</a></li>
                                            
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-3">
                            <div className="footer-bottom-innr">
                                
                                <h3>Contact Info</h3>
                                <ul className="info-btm">
                                    <li><span><img src="/images/footer-icon1.png" alt=""/></span><em>Vliegkamp Valkenburg - Building 377 <br/> Wassenaarseweg 75 <br/> 2223 LA Katwijk (ZH) <br/> The Netherlands</em></li>
                                    <li> <span><img src="/images/footer-icon2.png" alt=""/></span><em>Tel:<a href="tel: +31 (071) 7107424"> +31 (071) 7107424</a></em></li>
                                    <li>Kamer van Koophandel 55487777 <br /> BTW nummer NL8517.34.728.B01 </li>
                                </ul>
                                <div className="so-icon">
                                    <h3>Follow Us</h3>
                                    <ul>
                                        <li><a href=""><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                                        <li><a href=""><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                                        <li><a href=""><i className="fa fa-youtube-play" aria-hidden="true"></i></a></li>
                                    </ul>
                                </div>
                                <div className="payment">
                                    <h3>Payment methods</h3>
                                    <ul>
                                        <div className="row">
                                        <div className="col-lg-12 col-sm-12 col-xs-12">
                                            <li><a href=""><img src="/images/pay1.png" alt=""/></a></li>
                                            <li><a href=""><img src="/images/pay2.png" alt=""/></a></li>
                                            <li><a href=""><img src="/images/pay3.png" alt=""/></a></li>
                                            <li><a href=""><img src="/images/pay4.png" alt=""/></a></li>
                                            </div>
                                           <div className="col-lg-12 col-sm-12 col-xs-12"> 
                                                <li><a href=""><img src="/images/pay5.png" alt=""/></a></li>
                                                <li><a href=""><img src="/images/pay6.png" alt=""/></a></li>
                                                <li><a href=""><img src="/images/pay7.png" alt=""/></a></li>
                                                <li><a href=""><img src="/images/pay8.png" alt=""/></a></li>
                                            </div>
                                        </div>
                                </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className="footer-h text-center">
                <div className="container">
                    <p>© 2018 <a href="index.html">Rebelcell </a> BV. All Rights Reserved. Sitemap | <a href=""> Terms & Conditions </a></p>
                </div>
            </div>
        </footer>
    </>
  )
}

export default Footer;