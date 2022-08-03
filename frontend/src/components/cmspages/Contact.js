import React from 'react'
import {Link} from 'react-router-dom';

function Contact() {
  return (
    <>
      <section className="banner-sec contact-banner">
            <img src="/images/contact-banner.jpg" alt=""/>
            <div className="container">
                <div className="banner-txt">
                    <h1>Contact</h1> 
                     <ul className="breadcrumb">
                          <li><Link to="/">Home</Link></li>
                          <li>Contact</li>
                     </ul>
                </div>
            </div>
        </section>
   <section className="contact-sec">
      <div className="container">
          <div className="contact-outr">
              <div className="row">
                  <div className="col-lg-7 col-sm-7">
                      <div className="contact-innr">
                          <p>Would you like to know where a Rebelcell dealer is located in your area, would you like to request a dealer information package, or do you have another question for us? You can contact us via the form below.</p>
                          <div className="contact-form">
                              <form>
              <div className="row">
                <div className="col-lg-6 col-sm-6">
                  <div className="from-grp">
                    <div className="form-label">
                      <label for="name">Name</label>
                      <span className="star">*</span>
                    </div>
                    <input type="text" className="form-control" id="name" />
                  </div>
                </div>

                <div className="col-lg-6 col-sm-6">
                  <div className="from-grp">
                    <div className="form-label">
                      <label>Company Name</label>
                      <span className="star">*</span>
                    </div>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6">
                  <div className="from-grp">
                    <div className="form-label">
                      <label>Email</label>
                      <span className="star">*</span>
                    </div>

                    <input type="email" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6">
                  <div className="from-grp">
                    <div className="form-label">
                      <label>Telephone Number</label>
                    </div>
                    <input type="tel" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-12 col-sm-12">
                  <div className="from-grp">
                    <div className="form-label">
                      <label>Subject/Topic</label>
                    </div>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-12 col-sm-12">
                  <div className="from-grp">
                    <div className="form-label">
                      <label>Message</label>
                      <span className="star">*</span>
                    </div>
                    <textarea className="form-control"> </textarea>
                  </div>
                </div>
              </div>
                                  <div className="submit-bottom">
                                      <input type="submit" value="Send Message"/>
                                      <span><sup>*</sup>denotes required fields</span>
                                  </div>
            </form>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-5 col-sm-5 con-info">
                      <div className="contact-innr">
                          <h3>Contact Info</h3>
                          <div className="contact-info">
                              <ul>
                                  <li>
                                      <div className="contact-img">
                                          <img src="/images/cont1.png" alt=""/>
                                      </div>
                                      <div className="contact-txt">
                                          <h4>Address</h4>
                                          <p>Vliegkamp Valkenburg - Building 377 
                                            <br />Wassenaarseweg 75 
                                            <br />2223 LA Katwijk (ZH) 
                                            <br />The Netherlands</p>
                                      </div>
                                  </li>
                                  <li>
                                      <div className="contact-img">
                                          <img src="/images/cont2.png" alt=""/>
                                      </div>
                                      <div className="contact-txt">
                                          <h4>Contact Number</h4>
                                          <p>Tel: <a href="tel:+31 (071) 7107424">+31 (071) 7107424</a></p>
                                      </div>
                                  </li>
                                  <li>
                                      <div className="contact-img">
                                          <img src="/images/cont3.png" alt=""/>
                                      </div>
                                      <div className="contact-txt">
                                          <h4>Email</h4>
                                          <p><a href="mailto:Contact@Rebel-Cell.com">Contact@Rebel-Cell.com</a></p>
                                      </div>
                                  </li>
                                  <li>
                                      <div className="contact-img">
                                          <img src="/images/cont4.png" alt=""/>
                                      </div>
                                      <div className="contact-txt">
                                          <h4>Facebook Messenger</h4>
                                          <p><a href="javascript:void(0)">Facebook.com/rebelcellnl</a></p>
                                      </div>
                                  </li>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </section>
    </>
  )
}

export default Contact