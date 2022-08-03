import React from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import '../../App.css';

function Header() {

  const { cartItems } = useSelector(state => state.cart);
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
                        <li><Link to="/about">about</Link></li>
                        <li><Link to="/faq">f.a.q </Link></li>
                        <li><Link to="/support">support</Link></li>
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
                        <Link to="/shop"className="dropdown-toggle">Shop &nbsp;
                        <span><i className="fa fa-angle-down" aria-hidden="true"></i></span></Link>
                        <ul className="dropdown-menu">
                          <li><Link to="/category/outdoorboxes">Outdoorbox</Link></li>
                          <li><Link to="/category/batteries">Batteries</Link></li>
                          <li><Link to="/category/battery-chargers">Battery Chargers</Link></li>
                          <li><Link to="/category/accessories">Accessories</Link></li>
                          <li><Link to="/category/fishing-packages">Fishing Packages</Link></li>
                          <li><Link to="/category/other-products">Other Products</Link></li>
                        </ul>
                      </div> 
                  </li>
									<li>
										<Link to="/news">News</Link>
									</li>
                  <li>
										<Link to="/contact">Contact </Link>
									</li>
								</ul>
							</div>
						</div>
					</nav>
               </div>
               <div className="header-icon">
                    
                    <div className="cart-icon">
                      <Link to="/cart">
                        <span> <img src="/images/cart.png" alt="" /><sup>{cartItems.length}</sup></span>
                      </Link>
                    </div>
               </div>
           </div>
            </div>
       
   </header>
    </>
  )
}

export default Header;