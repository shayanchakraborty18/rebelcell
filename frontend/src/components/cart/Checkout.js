import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import OrderSummary from './OrderSummary';
import { countries } from 'countries-list';

import MetaData from '../layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, clearErrors } from '../../actions/orderActions'
import { clearCart } from '../../actions/cartActions'

import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'

import axios from 'axios'

const options = {
  style: {
    base: {
        fontSize: '16px'
    },
    invalid: {
        color: '#9e2146'
    }
  }
}

function Checkout({history}) {
  const countriesList = Object.values(countries)
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [country, setCountry] = useState('')

  const { cartItems } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.auth)
  const { error } = useSelector(state => state.newOrder)

    // Calculate Order Prices
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const totalPrice = (itemsPrice).toFixed(2)

  const shippingInfo = {
    address,
    city,
    postalCode,
    phoneNo,
    country
  }

  useEffect(() => {
    if (error) {
        alert.error(error)
        dispatch(clearErrors())
    }

  }, [dispatch, alert, error])

    const order = {
        orderItems: cartItems,
        shippingInfo
    }


    order.itemsPrice = itemsPrice;
    order.totalPrice = totalPrice;
    
    const paymentData = {
        amount: Math.round(totalPrice * 100)
    }

    const submitHandler = async (e) => {
      e.preventDefault();
      document.querySelector('#pay_btn').disabled = true;

      let res;
      try{
         const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            res = await axios.post('api/v1/payment/process', paymentData, config)

            const clientSecret = res.data.client_secret;

            // console.log(clientSecret);

            if (!stripe || !elements) {
                return;
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        phone: phoneNo,
                        address: {
                          city: city,
                          country: 'US',
                          line1: address,
                          postal_code: postalCode,
                          state: 'WC',
                        }
                    }
                }
            });

            if (result.error) {
                console.log(result.error);
                alert.error(result.error.message);
                document.querySelector('#pay_btn').disabled = false;
            } else {

                // The payment is processed or not
                if (result.paymentIntent.status === 'succeeded') {

                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }

                    dispatch(createOrder(order))

                    dispatch(clearCart());

                    history.push('/success')
                } else {
                    alert.error('There is some issue while payment processing')
                }
            }
      } catch(error) {
        document.querySelector('#pay_btn').disabled = false;
        alert.error(error.response.data.message)
        console.log(error.response);
      }
    }
  return (
    <>
    <MetaData title={'Checkout'} />
      <section className="banner-sec">
          <img src="/images/landing-banner.jpg" alt="" />
          <div className="container">
              <div className="banner-txt">
                  <h1>Checkout</h1>
                  <ul className="breadcrumb">
                      <li><Link to='/'>Home</Link></li>
                      <li><Link to='/shop'>Shop</Link></li>
                      <li><Link to='/cart'>my bag</Link></li>
                      <li>Checkout</li>
                  </ul>
              </div>
          </div>
      </section>
      <section className="checkout-sec">
          <div className="container">
              <div className="cart_itemtabe">

                  <div className="form_outr">
                      <form method="post" action="#" onSubmit={submitHandler}>
                          <div className="row">
                              <div className="col-lg-12 col-sm-12">
                                  <div className="hdr">
                                      <h2>1. shipping</h2></div>
                                  <div className="field_label">Where shall we ship your order?</div>
                              </div>
                          </div>
                          <div className="row">
                              <div className="col-lg-12 col-sm-12">
                                  <div className="select-style">
                                      <select
                                        id="country_field"
                                        className="form-control"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        required
                                      >
                                        {countriesList.map(country => (
                                            <option key={country.name} value={country.name}>
                                                {country.name}
                                            </option>
                                        ))}
                                      </select>
                                  </div>
                              </div>
                          </div>
                          <div className="row">
                              <div className="col-lg-12 col-sm-12">
                                <input
                                    type="text"
                                    id="address_field"
                                    className="form-control"
                                    value={address}
                                    placeholder="Please enter address"
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                              </div>
                          </div>
                          <div className="row">
                              <div className="col-lg-6 col-sm-6">
                                  <input
                                    type="text"
                                    id="city_field"
                                    className="form-control"
                                    value={city}
                                    placeholder="Please enter a city name"
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                  />
                              </div>
   
                              <div className="col-lg-6 col-sm-6">
                                  <input
                                    type="number"
                                    id="postal_code_field"
                                    className="form-control"
                                    value={postalCode}
                                    placeholder="Enter postal code"
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    required
                                  />
                              </div>
                          </div>
                          <div className="row">
                              <div className="col-lg-12 col-sm-12">
                                  <input
                                    type="phone"
                                    id="phone_field"
                                    className="form-control"
                                    value={phoneNo}
                                    placeholder="Enter phone number"
                                    onChange={(e) => setPhoneNo(e.target.value)}
                                    required
                                />
                              </div>
                          </div>
                          <br />
                          <div className="row">
                              <div className="col-lg-12 col-sm-12">
                                  <div className="hdr">
                                      <h2>2. Payment</h2></div>
                                  <div className="field_label">How would you like to pay for your order?</div>
                              </div>
                          </div>
                          <div className="row">
                              <div className="col-lg-12 col-sm-12">
                                
                                  <div className="radio_outr pynmt">
                                      <div className="inr_cell">
                                         
                                            <div className="form-group">
                                                <label htmlFor="card_num_field">Card Number</label>
                                                <CardNumberElement
                                                    type="text"
                                                    id="card_num_field"
                                                    className="form-control"
                                                    options={options}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="card_exp_field">Card Expiry</label>
                                                <CardExpiryElement
                                                  type="text"
                                                  id="card_exp_field"
                                                  className="form-control"
                                                  options={options}
                                                />
                                            </div>

                                            <div className="form-group">
                                              <label htmlFor="card_cvc_field">Card CVC</label>
                                              <CardCvcElement
                                                  type="text"
                                                  id="card_cvc_field"
                                                  className="form-control"
                                                  options={options}
                                              />
                                            </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <br />
                          <div className="row">
                              <div className="col-lg-12 col-sm-12">
                                  <input type="submit" value="PLACE ORDER" id='pay_btn' />
                              </div>
                          </div>
                      </form>
                  </div>

              </div>
            <OrderSummary />

          </div>
      </section>
    </>
  )
}

export default Checkout