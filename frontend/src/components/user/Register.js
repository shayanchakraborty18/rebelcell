import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { register, clearErrors } from '../../actions/userActions'

function Register({history}) {
  const [user, setUser] = useState({
      name: '',
      email: '',
      password: '',
  })

  const { name, email, password } = user;

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(state => state.auth);


  useEffect(() => {
    if (isAuthenticated) {
      history.push('/')
    }

    if(error) {
      alert.error(error);
      dispatch(clearErrors())
    }
  }, [dispatch, alert, isAuthenticated, error])

  
  const onChange = (e) => {
    setUser({...user, [e.target.name] : e.target.value});
  }

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);
    formData.set('password', password);

    dispatch(register(formData))
  }

  return (
    <>
      <MetaData title={'Register User'} />
      <section className="banner-sec">
        <img src="/images/landing-banner.jpg" alt="" />
        <div className="container">
            <div className="banner-txt">
                <h1>Register</h1>
                <ul className="breadcrumb">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/shop">Shop</Link></li>
                    <li>Register</li>
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
                          <h2>Register</h2>
                        </div>
                      </div>
                    </div>
                      <div className="row">
                          <div className="col-lg-12 col-sm-12">
                            <div className="field_label">Name</div>
                              <input type="text" placeholder="Name"  name='name' required onChange={onChange}/>
                          </div>
                      </div>
                      <div className="row">
                          <div className="col-lg-12 col-sm-12">
                            <div className="field_label">Email</div>
                              <input type="email" placeholder="Email" name='email' required onChange={onChange} />
                          </div>
                      </div>
                      <div className="row"> 
                          <div className="col-lg-12 col-sm-12">
                            <div className="field_label">Password</div>
                              <input type="password" placeholder="***********" name='password' required onChange={onChange}/>
                          </div>
                      </div>
                      
                      <div className="row">
                          <div className="col-lg-12 col-sm-12">
                              <input type="submit" value="Register" style={{width: '100%'}}  disabled={loading ? true : false}/>
                          </div>
                      </div>
                      <br />
                      <div className="row">
                          <div className="col-lg-12 col-sm-12">
                              <div className="field_label text-center">Already registered ? Please <Link to="/login">Login</Link></div>
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

export default Register