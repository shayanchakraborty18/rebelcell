import React, {useState, useEffect } from 'react';
import { Link  } from 'react-router-dom';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearErrors } from '../../actions/userActions';


function Login({history, location}) {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, isAuthenticated, error } = useSelector(state => state.auth);

  const redirect = location.search ? '/' + location.search.split('=')[1] : '/';


  useEffect(() => {

    if(isAuthenticated) {
      history.push(redirect);
    }

    if(error) {
      alert.error(error);
      dispatch(clearErrors());
    }

  }, [dispatch, alert, error, history, isAuthenticated]); 

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  }
  

  return (
    <>
      <MetaData title={`Login`} />
      <section className="banner-sec">
        <img src="/images/landing-banner.jpg" alt="" />
        <div className="container">
            <div className="banner-txt">
                <h1>Login</h1>
                <ul className="breadcrumb">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/shop">Shop</Link></li>
                    <li>Login</li>
                </ul>
            </div>
        </div>
      </section>
        <section className="checkout-sec">
        <div className="container" style={{display: 'flex', justifyContent: 'center' }}>
            <div className="cart_itemtabe login-sec" >

                <div className="form_outr">
                    <form method="post" action="#" onSubmit={submitHandler}>
                      <div className="row">
                        <div className="col-lg-12 col-sm-12">
                          <div className="hdr text-center">
                            <h2>Login</h2>
                          </div>
                        </div>
                      </div>
                        
                        <div className="row">
                            <div className="col-lg-12 col-sm-12">
                              <div className="field_label">Email</div>
                                <input type="email" placeholder="Email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-sm-12">
                              <div className="field_label">Password</div>
                                <input type="password" placeholder="***********" name='password' value={password}  onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col-lg-12 col-sm-12">
                                <input type="submit" value="Login" style={{width: '100%'}}/>
                            </div>
                        </div>

                        <br />
                        <div className="row">
                            <div className="col-lg-12 col-sm-12">
                                <div className="field_label text-center">Not registered  ? Please <Link to="/register">Register</Link></div>
                            </div>
                            
                        </div>
                        
                    </form>
                </div>

            </div>


        </div>
    </section>
    </>
  )
}

export default Login