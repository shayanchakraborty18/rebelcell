import React from 'react';
import { Link } from 'react-router-dom';


import '../../App.css';

function Header() {
  return (
    <>
         <header>
            <div className="header-top">
                <div className="container-fluid">
                <div className="header-top-innr innr-detail1">
                    <ul>
                        <li><span><img src="/images/phone.png" alt=""/></span><a href="tel:+31 (071) 7107424">+31 (071) 7107424</a></li>
                        <li><span><img src="/images/mail.png" alt=""/></span><a href="mailto:contact@rebel-cell.com">contact@rebel-cell.com</a></li>
                    </ul>
                </div>
                <div className="header-top-innr">
                    <p>The ultimate li-ion batteries for angling Ordered before 12 noon the next working day sent Shipping from € 5.95</p>
                </div>
                <div className="header-top-innr innr-detail">
                    <ul>
                        <li><a href="about.html">about</a></li>
                        <li><a href="faq.html">f.a.q </a></li>
                        <li><a href="support.html">support</a></li>
                    </ul>
                </div>
                <div className="header-top-innr sign-innr">
                    <a href="" className="top-btn"> Sign In</a>
                </div>
            </div>
       </div>
       
           <div className="header-outr clearfix">
              <div className="logo">
                  <Link to="/"><img src="/images/logo.png" alt=""/></Link>
              </div>
          
               <div className="header-right">
               <div className="header-menu">
                   <nav className="navbar">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							</button>
							<div className="collapse navbar-collapse top_nav" id="bs-example-navbar-collapse-1">
								<ul>
									<li className="active top-innr">
										 <div className="dropdown">
                        <a href="product-category.html"className="dropdown-toggle">Shop
                        <span><i className="fa fa-angle-down" aria-hidden="true"></i></span></a>
                        <ul className="dropdown-menu">
                          <li><a href="shop.html">product categories</a></li>
                          <li><a href="shop.html">product categories</a></li>
                          <li><a href="shop.html">product categories</a></li>
                        </ul>
                      </div> 
                  </li>
									<li  className="top-innr">
										<div className="dropdown">
                      <a  href="target-audiance.html" className="dropdown-toggle">Target
                      </a>
                      <ul className="dropdown-menu">
                        <li><a href="">Carp</a></li>
                        <li><a href="">Predator</a></li>
                        <li><a href="">E boating</a></li>
                        <li><a href="">Other applications</a></li>
                      </ul>
                    </div> 
									</li>
									<li>
										<Link to="/news">News</Link>
									</li>
                                    <li>
										<a href="contact.html">Contact </a>
									</li>
								</ul>
							</div>
						</div>
					</nav>
               </div>
               <div className="header-icon">
                    
                    <div className="cart-icon">
                        <span> <img src="/images/cart.png" alt="" /><sup>5</sup></span>
                    </div>
               </div>
           </div>
            </div>
       
   </header>
    </>
  )
}

export default Header;