import React, { useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import {useDispatch, useSelector} from 'react-redux';
import {useAlert} from 'react-alert';

import Loader from '../layout/Loader';

import { getProducts, clearErrors } from '../../actions/productActions';
import { addItemToCart } from '../../actions/cartActions';

import ProductCategories from './ProductCategories';
import MetaData from '../layout/MetaData';

function Shop() {
  const [ currentPage, setCurrentPage] = useState(1);
  const [availibility, setAvailibility] = useState('');
  const dispatch = useDispatch();
  const alert = useAlert();

  const {products, error, productsCount, resPerPage, filteredProductsCount, loading} = useSelector(state => state.products);

  useEffect(() => {
    if(error) {
      alert.show(error);
      dispatch(clearErrors());
    }
   dispatch(getProducts('', 1, availibility))

  }, [error,dispatch, availibility])


  const addToCart = (id, stock) => {
    if(stock <= 0) {
      alert.error('The Item is Out of Stock'); 
      return;
    }
    dispatch(addItemToCart(id, stock));
    alert.success('Item added to cart successfully');
  }

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  const availHandler = (e) => {
    setAvailibility(e.target.value);
  }

  const resetFilter = (e) => {
    e.preventDefault();
    setAvailibility('');
  } 

  let count = productsCount;

  return (
    <>
    <MetaData title={'Shop'} />
      <section className="banner-sec">
            <img src="/images/landing-banner.jpg" alt=""/>
            <div className="container">
                <div className="banner-txt">
                    <h1>Shop</h1> 
                     <ul className="breadcrumb">
                          <li><Link to="/">Home</Link></li>
                          <li>Shop</li>
                     </ul>
                </div>
            </div>
        </section>
        
          <section className="pro-category-sec">
            <div className="container-fluid">
                <div className="category-outr">
                    <div className="row">
                        <div className="col-lg-2 col-sm-2">
                            <div className="category-left">
                                
                               <ProductCategories />
                               
                                <div className="category-checkbox">
                                    <h3>Availability</h3>
                                      <label className="cat-check">In Stock
                                        <input type="radio" name='avail' value='instock' onChange={availHandler} checked={availibility === 'instock' ? 'checked': '' }/>
                                        <span className="checkmark"></span>
                                      </label>

                                      <label className="cat-check">Limited Stock
                                        <input type="radio" name='avail' value='limitedstock' onChange={availHandler} checked={availibility === 'limitedstock' ? 'checked': '' } />
                                        <span className="checkmark"></span>
                                      </label>
                                      <label className="cat-check">Out Of Stock
                                        <input type="radio"  name='avail' value='outofstock' onChange={availHandler} checked={availibility === 'outofstock' ? 'checked': '' } />
                                        <span className="checkmark"></span>
                                      </label>
                                </div>
                                <a href="" onClick={resetFilter} className="hide-btn">Reset Filters</a>
                            </div>
                        </div>
                        <div className="col-lg-10 col-sm-10">
                            <div className="category-right">
                                <div className="category-right-innr" id="products">
                                  {loading ? <Loader /> : <>
                                  {products.length > 0 ? products.map(product => (
                                    <>
                                    <div key={product._id} className="item col-lg-4 col-md-4 col-sm-6 col-xs-6 plat_height">
                                      <div className="category-box">
                                          {product.availibility === 'instock' && (
                                            <div className="top-txt">
                                              <h6>instock</h6>
                                            </div>
                                          )}

                                          {product.availibility === 'outofstock' && (
                                            <div className="top-txt red-txt">
                                              <h6>out of stock</h6>
                                            </div>
                                          )}

                                          {product.availibility === 'limitedstock' && (
                                            <div className="top-txt">
                                              <h6>limited stock</h6>
                                            </div>
                                          )}
                                          
                                          
                                          <div className="category-box-innr img-box">
                                              <img width="150px" src={`/admin_uploads/${product.featured_image}`} alt=""/>
                                          </div>
                                          <div className="category-box-innr text-box">
                                            <div className="battery-txt">
                                                  <h4>out of stock</h4>
                                                  <h3>{product.name}</h3>
                                              </div>
                                              <div className="batt-price">
                                                  <div className="price">
                                                    <span>{`$${product.price.toFixed(2)}`}</span> 
                                                  </div>
                                              
                                              </div>
                                              
                                          </div>
                                          <div className="category-box-innr box-btn text-right">
                                              <div className="battery-btn">
                                                  <Link to={`/product/${product.slug}`} className="ban-btn batt-btn">details</Link>
                                                  <button className="ban-btn border-btn" onClick={() => addToCart(product._id, 1)}>add to cart</button>
                                              </div>
                                          </div>
                                      </div>
                                    </div>
                                    
                                        

                                      
                                  </>

                                  )) : (
                                    <h1>No Products Found</h1>
                                  )}
                                    
                                    </>}
                                    
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

export default Shop