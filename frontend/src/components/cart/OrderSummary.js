import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function OrderSummary() {
  const { cartItems } = useSelector(state => state.cart);

     // Calculate Order Prices
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const totalPrice = (itemsPrice).toFixed(2)
 
  return (
    <>
      <div className="summary-outr">
        <div className="cart_totalouter chkout">
            <div className="cart_total">
                <div className="cart_total_chart">
                    <div className="cart_total_txtoouter">
                        <h3>ORDER SUMMARY</h3>
                        <div className="odr-book-main">
                          {cartItems.map(item => (

                          
                            <div key={item.product} className="odr-order-book-outr">
                                <div className="oder-book-cell">
                                    <Link to={`/product/${item.slug}`} alt="">
                                      <img src={`/admin_uploads/${item.featured_image}`}/>
                                    </Link>
                                </div>

                                <div className="oder-book-cell">
                                    <div className="odr-bok-details">

                                        <h4> {item.name}</h4>
                                        <div className="pro_price">
                                            <span>Qty: </span>
                                            <span>{item.quantity}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="oder-book-cell">
                                    <div className="euro_outer"> ${item.price.toFixed(2)}</div>
                                </div>
                            </div>
                          ))}
                        </div>
                        <div className="cart_total_txt">
                            <span>Subtotal</span>
                            <span>${totalPrice}</span>
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
                            <span>${totalPrice}</span>
                        </div>
                        
                    </div>
                    

                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default OrderSummary