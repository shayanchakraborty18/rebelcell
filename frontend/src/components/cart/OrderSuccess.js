import React, {Fragment} from 'react';
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'

const OrderSuccess = () => {
  return (
    <Fragment>
      <MetaData title={'Order Success'} />

      <section className="banner-sec">
          <img src="/images/landing-banner.jpg" alt="" />
          <div className="container">
              <div className="banner-txt">
                  <h1>Checkout</h1>
                  <ul className="breadcrumb">
                      <li><Link to='/'>Home</Link></li>
                      <li><Link to='/shop'>Shop</Link></li>
                      <li><Link to='/cart'>my bag</Link></li>
                      <li>Order Success</li>
                  </ul>
              </div>
          </div>
      </section>
      <section className="checkout-sec">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-6 mt-5 text-center">
                <img className="my-5 img-fluid d-block mx-auto" src="/images/order_success.png" alt="Order Success" width="200" height="200" />
                <h1 style={{paddingTop: '10px', fontSize: '30px'}}> Order has been placed successfully.</h1>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default OrderSuccess;