import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';

import {useDispatch, useSelector} from 'react-redux';
import {useAlert} from 'react-alert';

import { getProductDetails, clearErrors } from '../../actions/productActions';
import { addItemToCart } from '../../actions/cartActions';
import {Loader} from '../layout/Loader';
import MetaData from '../layout/MetaData';


function ProductDetails() {
  const [initalTab, setInitialTab] = useState('Features');
  const [quantity, setQuantity ] = useState(1);
  const dispatch = useDispatch();
  const alert = useAlert();
  const {slug} = useParams();

  const { product, error,loading } = useSelector(state => state.productDetails);

  useEffect(() => {
    dispatch(getProductDetails(slug));
    if(error) {
      alert.show(error);
      dispatch(clearErrors());
    }

  }, [dispatch, alert, error, slug]);

  const addToCart = (id, stock) => {
    if(stock <= 0) {
      alert.error('The Item is Out of Stock'); 
      return;
    }
    dispatch(addItemToCart(id, quantity));
    alert.success('Item added to cart successfully');
  }

  const openTabContent = (tab) => {
    setInitialTab(tab);
  }

  const decreaseQty = () => {
    const count = document.querySelector('.count');

    if(count.valueAsNumber <= 1) return; 

    const qty = count.valueAsNumber - 1;

    setQuantity(+qty);
  }

  const increaseQty = () => {
    const count = document.querySelector('.count');

    if(count.valueAsNumber >= product.stock) return; 

    const qty = count.valueAsNumber + 1;

    setQuantity(+qty);
  }
  return (
    <>
    <MetaData title={product.name} />
      <section className="banner-sec">
        <img src="/images/landing-banner.jpg" alt=""/>
          <div className="container">
              <div className="banner-txt">
                  <h1>{product.name}</h1> 
                    <ul className="breadcrumb">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/shop">Shop</Link></li>
                        <li>{product.name}</li>
                    </ul>
              </div>
          </div>
      </section>
      {loading ? <Loader /> : <>
         <section className="add-to-cart-sec">
          <div className="container">
              <div className="add-cart-outr">
                  <div className="row">
                      <div className="col-lg-5 col-sm-5">
                          <div className="add-cart-innr text-center">
                              <div className="product-img-box">
                                <div className="slider_inr clearfix">

                                <img src={`/admin_uploads/${product.featured_image}`} alt={product.name} className="cursor"/>             
                                                
                              </div>
                          </div>
                      </div>
                      </div>
                      <div className="col-lg-7 col-sm-7">
                          <div className="add-cart-innr add-cart2">
                              <div className="cart-top">
                                  <div className="cart-price">
                                      <h3>{`$ ${Number(product.price).toFixed(2)}`}</h3>
                                  </div>
                              </div>
                              <div className="cart-details">
                                  <div dangerouslySetInnerHTML={{__html: product.short_description}} />
                                  <div className="cart-bottom">
                                      <div className="quantity">
                                          <p>Quantity</p>
                                          <div className="quantityouter"> 
                                            <div className="quanty-in">
                                                <button id="minus" onClick={decreaseQty}>-</button>
                                                <input type="number" className="count" value={quantity} id="number" readOnly/>
                                                <button id="plus" onClick={increaseQty}>+</button>
                                            </div>
                                          </div> 
                                      </div>
                                      <div className="cart-btnn text-center">
                                          <button className="ban-btn" onClick={() => addToCart(product._id, product.stock)}>Add to cart</button>
                                      </div>
                                      <div className="in-stock">
                                        {product.availibility === 'instock' && (
                                            <p>In Stock</p>
                                          )}

                                          {product.availibility === 'outofstock' && (
                                            <p>Out Of Stock</p>
                                          )}

                                          {product.availibility === 'limitedstock' && (
                                            <p>Limited Stock</p>
                                          )}
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <section className="review-sec">
            <div className="container">
                <div className="review-outr">
                    <div className="tab-space">
                        <a className={`tablink ${initalTab === 'Features' ? 'active' : ''}`} onClick={() => openTabContent('Features')} id="defaultOpen">Main Features </a>
                        <a className={`tablink ${initalTab === 'Info' ? 'active' : ''}`} onClick={() => openTabContent('Info')} > Important Info </a>
                        <a className={`tablink ${initalTab === 'Specifications' ? 'active' : ''}`} onClick={() => openTabContent('Specifications')} >Details & Specifications  </a>
                    </div>
                    <div id="Features" className="tabcontent" style={{display: initalTab === 'Features' ? 'block' : 'none' }}>
                        <div className="main-feature-outr">
                           <div dangerouslySetInnerHTML={{__html: product.description}} />
                        </div>
                    </div>

                    <div id="Info" className="tabcontent" style={{display: initalTab === 'Info' ? 'block' : 'none' }}>
                        <div className="pay-im-info-outr">
                            <div dangerouslySetInnerHTML={{__html: product.important_info}} />
                        </div>
                    </div>

                    <div id="Specifications" className="tabcontent" style={{display: initalTab === 'Specifications' ? 'block' : 'none' }}>
                      <div dangerouslySetInnerHTML={{__html: product.details_specification}} />                  
                    </div>

                </div>
            </div>
        </section>
      
      </>}
     
				
    </>
  )
}

export default ProductDetails