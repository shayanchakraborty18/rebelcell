import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

import MetaData from '../layout/MetaData';
import {Loader} from '../layout/Loader';
import { useAlert } from 'react-alert';
import { getProducts, clearErrors } from '../../actions/productActions';
import ProductCategories from './ProductCategories';

function Search({match}) {

  const keyword = match.params.keyword
  const [availibility, setAvailibility] = useState('');
  const dispatch = useDispatch();
  const alert = useAlert();

  const { products, error, loading } = useSelector(state => state.products);

  useEffect(() => {
    if(error) {
      alert.show(error);
      dispatch(clearErrors());
    }
   dispatch(getProducts(keyword, 1, availibility))

  }, [error,dispatch, availibility, keyword])

  return (
    <Fragment>
      <MetaData title={'Shop'} />
      <section className="banner-sec">
            <img src="/images/landing-banner.jpg" alt=""/>
            <div className="container">
                <div className="banner-txt">
                    <h1>Search</h1> 
                     <ul className="breadcrumb">
                          <li><Link to="/">Home</Link></li>
                          <li>Search</li>
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
                               
                                
                            </div>
                        </div>
                        <div className="col-lg-10 col-sm-10">
                            <div className="category-right">
                                <div className="category-right-innr" id="products">
                                  <h1 style={{fontSize:'30px', marginBottom: '20px'}}> You Have searched for : {keyword}</h1>
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
    </Fragment>
  )
}

export default Search