import React, {useEffect, Fragment} from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../actions/userActions';
import { getOrderDetails, clearErrors } from '../../actions/orderActions';

function OrderDetails({ match, location }) {
  const alert = useAlert();
  const dispatch = useDispatch();
  
  const {user} = useSelector(state => state.auth)
  const {order, error, loading} = useSelector(state => state.orderDetails)
  
  useEffect(() => {
  
    if(error) {
      alert.error(error);
      dispatch(clearErrors())
    }

    dispatch(getOrderDetails(match.params.id));
    
  }, [alert, dispatch, error, match.params.id])

  const logoutHandler = () => {
    dispatch(logout());
    alert.show('Logged out successfully');
  }

  return (
    <Fragment>

      <section className="banner-sec">
          <img src="/images/landing-banner.jpg" alt=""/>
          <div className="container">
              <div className="banner-txt">
                  <h1>my orders</h1> 
                    <ul className="breadcrumb">
                        <li>
                          <Link to="/">Home</Link>
                        </li>
                        <li>my orders</li>
                    </ul>
              </div>
          </div>
      </section>
    <section className="add-to-cart-section">
			<div className="container">
				<div className="row">
				<div className="my-account-outr">
					<div className="col-lg-3 col-sm-3">
						<div className="user-panel">
							<div className="user-bx">
								<div className="user-pic"><img src="/images/user-pic.png" alt=""/></div>
							</div>
							<div className="user-name">
								<span>{user.name}</span>
								<Link to="/" onClick={logoutHandler}> Log out</Link>
							</div>
							
							<div className="user-dash">
								<ul>
									<li className={location.pathname === '/me' ? `active` : ``}>
										<Link to="/me">Dashboard</Link>
									</li>
									<li className={location.pathname === '/myorders' ? 'active' : ''}>
										<Link to="/myorders" > Orders</Link>
									</li>
									<li>
										<Link to="/">Account Details</Link>
									</li>
									<li>
										<Link to="/" onClick={logoutHandler}> Log out</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="col-lg-9 col-sm-9">
						<div className="my-account-txt">
							<h3>My Orders</h3>
							<p>Hello {user.name} (not admin? <Link to="/" onClick={logoutHandler}> Log out</Link>) From your account dashboard you can view your recent orders </p>
              <div className="recent-order">
								<h3>Order Details</h3>
								
								<div className='order-details'>
                  Order Id: 
                </div>
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

export default OrderDetails;
