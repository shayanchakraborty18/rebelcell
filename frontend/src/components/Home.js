import React,  { useState } from 'react';

import HomeBlog from './blog/HomeBlog';
import HomeSlider from './home/HomeSlider'; 


function Home() {
 
  return (
    <>
      <HomeSlider />
      <section className="why-you-pick">
        <div className="container">
            <div className="commn-header text-center">
                <h5>Powerful, Lightweight, Durable.</h5>
                <h3>This is Why you pick rebelcell</h3>
                <p>Hassle free Lithium Ion batteries for portable waterside energy,<br /> propulsion of electric outboards and fishfinders.</p>
            </div>
            <div className="pick-outr">
                <div className="row">
                    <div className="col-lg-4 col-sm-4 innr-left">
                        <div className="pick-innr text-right">
                            <ul>
                                <li>
                                <div className="pick-txt">
                                   <h3>Delivers More Power</h3> 
                                    <p>High thrust even when the battery is nearly empty</p>
                                 </div>
                                </li>
                                <li>
                                <div className="pick-txt">
                                   <h3>ComPact & lightweight</h3> 
                                    <p>Built with maximum portability with up to 70% savings in weight.</p>
                                 </div>
                                </li>
                                <li>
                                <div className="pick-txt">
                                   <h3>Durable & Well tested</h3> 
                                    <p>Extensively tested by demanding carp anglers and predators.</p>
                                 </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-4  p-innr">
                        <div className="pick-innr">
                            <img src="/images/feature-box.png" alt=""/>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-4">
                        <div className="pick-innr innr-right">
                            <ul>
                                <li>
                                <div className="pick-txt">
                                   <h3>High ease of use</h3> 
                                    <p>Fast  & intermediate charging, digital charge status indicator.</p>
                                 </div>
                                </li>
                                <li>
                                <div className="pick-txt">
                                   <h3>Long lifespan </h3> 
                                    <p>Built-in abuse protection and will last up to 10 fishing seasons.</p>
                                 </div>
                                </li>
                                <li>
                                <div className="pick-txt">
                                   <h3>Cheaper to use</h3> 
                                    <p>Battery costs up to 50% per year lower than a lead battery.</p>
                                 </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                     <div className="p-innr1">
                            <img src="/images/feature-box.png" alt=""/>
                        </div>
                </div>
            </div>
         </div>
        <div className="pick-bottom clearfix">
                <div className="col-lg-4 col-sm-4 box1">
                    <div className="pick-bottom-innr">
                        <div className="pick-bottom-icon">
                            <div className="icon-circle">
                                <img src="/images/warrenty-icon.png" alt=""/>
                            </div>
                        </div>
                        <div className="pick-bottom-txt">
                            <h3>2 year warranty</h3>
                            <p>Our products are extremely tough but also come with a 2 year warranty.</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-4 box2">
                    <div className="pick-bottom-innr">
                         <div className="pick-bottom-icon">
                             <div className="icon-circle">
                            <img src="/images/secure-icon.png" alt=""/>
                             </div>
                        </div>
                        <div className="pick-bottom-txt">
                            <h3>Secure Payments</h3>
                            <p>Payments take place on a secure connection and are thoroughly scanned every day for viruses and other problems.</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-4 box3">
                    <div className="pick-bottom-innr">
                         <div className="pick-bottom-icon">
                             <div className="icon-circle">
                            <img src="/images/delivery-icon.png" alt=""/>
                             </div>
                        </div>
                        <div className="pick-bottom-txt">
                            <h3>Fast Delivery</h3>
                            <p>Ships the next business day. Orders in the Netherlands and Belgium arrive within 2 working days after shipment.</p>
                        </div>
                    </div>
                </div>
            </div>
    </section>     

        <section className="video clearfix">
            <div className="container">
                <div className="video-outr text-center">
                    <div className="video-txt">
                        <h3>rebelcell in action</h3>
                        <p>Watch Felix Frey use the <span>RebelCell 12V25 </span>Angling Li-ion battery during kayak fishing for pike to supply his Lowrance HDS Carbon 9 and Lowrance Elite Ti 9 with 3D StructureScan all day long.</p>
                    </div>
                    <div className="video-innr">
                        <iframe width="624" height="360" src="https://www.youtube.com/embed/-4wEf_FPesY" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                    </div>
                </div>
            </div>
        </section>

        <div className="product-sec">
            
                <div className="product-outr">
                    <div className="pro-outr">
                        <div className="container">
                            
                            <div className="row">
                                <div className="col-lg-6 col-sm-6 pro-innr1">
                                    <div className="product-innr">
                                        <img src="/images/develop-img.png" alt=""/>
                                    </div>
                                </div>
                                 <div className="col-lg-6 col-sm-6 pro-innr">
                                    <div className="product-innr">
                                        <div className="commn-header">
                                            <h5>be a part of our product</h5>
                                            <h3>Development Process</h3>
                                            <p>By engaging our clients and involving them early on in our product development cycle we develop innovative products that allow our customers to do what they really want to do -</p>
                                        </div>
                                        <h6>Go "die hard" carp or Pike fishing without worrying  about weather their battery can keep up.</h6>
                                    </div>
                                </div>
                            
                            </div>
                        </div>
                    </div>
               
                    <div className="pro-outr">
                        <div className="container">
                           
                            <div className="row">
                                <div className="col-lg-6 col-sm-6 pro-innr1">
                                     <div className="product-innr">
                                        <img src="/images/product-img.png" alt=""/>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-sm-6 pro-innr">
                                    <div className="product-innr">
                                         <div className="commn-header">
                                        <h5>Let us help you find</h5>
                                        <h3>The Perfect rebelcell Product For you</h3>
                                        <p>Our Product Finder is a tool designed to narrow down your search by finding your preference from a series of simple product questions.</p>
                                    </div>
                                        <a  className="product-btn">visit The Product Finder</a>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
        </div>

        <section className="prod-sec">
            <div className="container">
                <div className="commn-header text-center">
                    <h5>Discover</h5>
                    <h3>Our rebelcell Products</h3>
                </div>
                <div className="prod-outr">
                    <div className="row">
                        <div className="col-lg-8 col-sm-8">
                            <div className="prod-innr">
                                <div className="prod-img">
                                    <img src="/images/product1.jpg" alt=""/>
                                    <div className="prod-txt">
                                    <h3>Angling Batteries</h3>
                                    <a >View All</a>
                                </div>
                                </div>
                                
                            </div>
                            <div className="prod-innr innr-space">
                              <div className="row">
                                <div className="col-lg-6 col-sm-6">
                                    <div className="prod-innr-box">
                                        <div className="prod-img">
                                            <img src="/images/product3.jpg" alt=""/>
                                             <div className="prod-txt">
                                            <h3>Battery Chargers</h3>
                                            <a >View All</a>
                                            </div>
                                        </div>
                                       
                                    </div>
                                </div>
                                   <div className="col-lg-6 col-sm-6">
                                    <div className="prod-innr-box">
                                        <div className="prod-img">
                                        <img src="/images/product4.jpg" alt="" />
                                        <div className="prod-txt">
                                        <h3>Accessories</h3>
                                        <a >View All</a>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                               </div>  
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-4">
                            <div className="prod-innr">
                                <div className="prod-img">
                                <img src="/images/product2.jpg" alt="" />
                                <div className="prod-txt">
                                    <h3>Outdoor Boxe</h3>
                                    <a >View All</a>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="prod-bottom innr-space">
                    <div className="prod-innr">
                        <div className="row">
                                <div className="col-lg-6 col-sm-6">
                                    <div className="prod-innr-box">
                                        <div className="prod-img">
                                        <img src="/images/product5.jpg" alt="" />
                                        <div className="prod-txt">
                                        <h3>Fishing Packages</h3>
                                        <a >View All</a>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                   <div className="col-lg-6 col-sm-6">
                                    <div className="prod-innr-box">
                                        <div className="prod-img">
                                        <img src="/images/product6.jpg" alt="" />
                                        <div className="prod-txt">
                                        <h3>Other Products</h3>
                                        <a >View All</a>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                        </div>  
                    </div>
                </div>
            </div>
        </section>

        <HomeBlog />
    </>
  )
}

export default Home;