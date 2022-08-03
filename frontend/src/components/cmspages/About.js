import React from 'react'
import {Link} from 'react-router-dom';

function About() {
  return (
    <>
      <section className="banner-sec">
            <img src="/images/landing-banner.jpg" alt=""/>
            <div className="container">
                <div className="banner-txt">
                    <h1>About</h1> 
                     <ul className="breadcrumb">
                          <li><Link to="/">Home</Link></li>
                           <li>about</li>
                     </ul>
                </div>
            </div>
        </section>
    <div className="product-sec innr-sec">
                <div className="product-outr">
                    <div className="pro-outr">
                        <div className="container">
                            <div className="row">
                                 <div className="col-lg-12 col-sm-12">
                                    <div className="product-innr">
                                        <div className="commn-header">
                                            <h5>LOREM IPSUM DOLOR</h5>
                                            <h3>Lorem Ipsum is simply dummy</h3>
                                            <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sodales volutpat suscipit. Sed eleifend libero dolor, vel gravida sem venenatis eu. Nam ultricies ante enim, sit amet volutpat augue venenatis sed. Fusce interdum ornare diam, at cursus magna pulvinar et. Nulla interdum viverra auctor. Integer convallis maximus maximus. Vestibulum ac lectus non sem porttitor vehicula. Vivamus viverra, eros id suscipit tempus, velit massa feugiat risus, vitae maximus sem ipsum vitae ante. Nullam interdum condimentum bibendum. Etiam at molestie metus. Morbi tellus nulla, vehicula sit amet volutpat at, dapibus rhoncus arcu. Praesent ornare feugiat augue vitae pretium. Pellentesque placerat et est eu convallis. Sed sem arcu, maximus eu orci eu, mollis dapibus sem. Praesent sollicitudin libero vel nisi tincidunt bibendum. Donec eu nisl ipsum.</p>
                                            <p>
                                            Morbi justo tellus, fermentum at iaculis nec, sodales at lorem. Aliquam at volutpat justo. Vestibulum ac laoreet purus, vel iaculis velit. Proin dictum, arcu eu scelerisque gravida, velit lacus viverra massa, in malesuada mi velit ac sapien. Cras facilisis dapibus posuere. Vivamus congue, elit in volutpat ullamcorper, massa purus gravida dolor, eu ultricies massa metus ac velit. Sed porta justo ac mauris lacinia egestas. In nibh felis, convallis eget nisl sit amet, pharetra tristique eros. Nunc laoreet tellus id arcu malesuada aliquam.</p>
                                            <p>
                                            Vestibulum sit amet accumsan sapien. Donec vel aliquet turpis. Phasellus quis cursus lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla pretium, orci nec porttitor varius, arcu magna elementum lacus, eget dictum libero risus a ipsum. Nulla vitae libero molestie nulla posuere vehicula nec ac velit. Mauris lacinia elit justo.</p>
                                            <p>
                                            Cras condimentum massa eu massa sodales faucibus. Duis rutrum ante nec congue viverra. Phasellus vestibulum risus a blandit pellentesque. Nullam dignissim purus finibus, suscipit tortor eu, dignissim dui. In hac habitasse platea dictumst. Suspendisse potenti. Aenean imperdiet viverra fermentum.</p>
                                            <p>
                                            Nullam at tortor vel lacus imperdiet venenatis eget in ipsum. Nunc tempus quam ut nisi tristique volutpat. Cras maximus ultricies libero iaculis tristique. Integer sed vestibulum justo, vel mattis urna. Nulla tortor enim, facilisis nec quam id, facilisis pharetra nulla. Sed pellentesque metus leo, eget egestas dui pellentesque quis. Vestibulum ultrices, mauris vitae tempus mollis, dui massa consectetur lectus, in tempor purus turpis id nulla. Aenean mattis quam in eros suscipit imperdiet. Quisque vel felis elit. </p>
                                        </div>
                                        <h6>Go "die hard" carp or Pike fishing without worrying  about weather their battery can keep up.</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
               
                </div>
        </div>
    </>
  )
}

export default About