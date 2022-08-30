import React from 'react';
import {Link } from 'react-router-dom';

import MetaData from '../layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, removeItemFromCart } from '../../actions/cartActions'


function Cart({history}) {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { cartItems } = useSelector(state => state.cart);
  const { isAuthenticated } = useSelector(state => state.auth);

  const removeCartItemHandle = product => {
    dispatch(removeItemFromCart(product));
    alert.success('Item removed successfully');
  }

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;

    if (newQty > stock) return;

    dispatch(addItemToCart(id, newQty))
    alert.info('Cart Updated')
  }


  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;

    if(newQty <= 0) return;

    dispatch(addItemToCart(id, newQty))
    alert.info('Cart Updated')
  }

  const checkoutHandler = () => {
    history.push(isAuthenticated === true ? "/checkout" : "/login?redirect=checkout");
  }
 
  return (
    <>
      <MetaData title={'My Bag'} />
      <section className="banner-sec">
        <img src="/images/landing-banner.jpg" alt=""/>
        <div className="container">
            <div className="banner-txt">
              <h1>My Bag</h1>
              <ul className="breadcrumb">
                <li><Link to="/"> Home</Link></li>
                <li><Link to="/shop">Shop</Link></li>
                <li>My Bag</li>
              </ul>
            </div>
        </div>
      </section>
      {cartItems.length === 0 ? (
        <section className="cart-section">
            <div className="container">
               <h1 className="mt-5 text-center" style={{fontWeight: "bold", fontSize: '50px'}}>Your Cart is Empty</h1>
            </div>
          </section>
      ) : <>
          <section className="cart-section">
            <div className="container">
                <div className="cart_itemtabe">
                  <div className="table_content">
                      <div className="table_row table_hed">
                        <div className="tabl_col">MY BAG</div>
                        <div className="tabl_col"> QUANTITY </div>
                        <div className="tabl_col">TOTAL</div>
                      </div>
                      {cartItems.map((item, index) => (
                        <div className="table_row table_body" key={item.product}>
                          <div className="tabl_col">
                            <div className="cart_imgouter">
                              <Link to={`/product/${item.slug}`} alt="">
                                <img src={`/admin_uploads/${item.featured_image}`}/>
                              </Link>
                             </div>
                              <div className="pro-desc">
                                <h4>{item.name}</h4>
                                <div className="pro_price">
                                    <span>PRICE </span>
                                    <span>$ {item.price.toFixed(2)}</span>
                                </div>
                                <a href="#" className="delete_btnn" onClick={() => removeCartItemHandle(item.product)}>Delete</a>
                              </div>
                          </div>
                          <div className="tabl_col">
                              <div className="quantity">
                                <div className="quan-in">
                                    <button id="mins" onClick={() => decreaseQty(item.product, item.quantity)}>-</button><input type="text" className='count' value={item.quantity} id="nmber" readOnly/><button id="pls" onClick={() => increaseQty(item.product, item.quantity, item.stock)}>+</button>
                                </div>
                              </div>
                          </div>
                          <div className="tabl_col">
                              <div className="euro_outer"> $ {Number(item.quantity * item.price).toFixed(2)}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="summary-outr">
                  <div className="cart_totalouter">
                      <div className="cart_total">
                        <div className="cart_total_chart">
                            <div className="cart_total_txtoouter">
                              <h3>ORDER SUMMARY</h3>
                              <div className="cart_total_txt">
                                  <span>Total Items</span>
                                  <span>  
                                    {cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)}
                                  </span>
                              </div>
                              <div className="cart_total_txt">
                                  <span>Shipping</span>
                                  <span>FREE</span>
                              </div>
                              <div className="cart_total_txt standrd">
                                  <span>(Standard: within 10 business days)</span>
                              </div>
                              <div className="cart_total_txt totl">
                                  <span>ORDER TOTAL </span>
                                  <span>$ {cartItems.reduce((acc, item) => (acc + Number(item.quantity * item.price)), 0).toFixed(2)}</span>
                              </div>
                            </div>
                            <button className="coupon_btn" onClick={checkoutHandler}> PROCEED TO CHECKOUT </button>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
          </section>
      </>}
      
    </>
  )
}

export default Cart;