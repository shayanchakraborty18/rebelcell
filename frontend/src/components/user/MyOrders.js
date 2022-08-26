import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../actions/userActions';
import { myOrders, clearErrors } from '../../actions/orderActions';

function MyOrders({location}) {
  const alert = useAlert();
  const dispatch = useDispatch();
  
  const {user} = useSelector(state => state.auth)
  const {orders, error} = useSelector(state => state.myOrders)

  useEffect(() => {
  
    if(error) {
      alert.error(error);
      dispatch(clearErrors())
    }

    dispatch(myOrders());
  }, [alert, dispatch])

  const logoutHandler = () => {
    dispatch(logout());
    alert.show('Logged out successfully');
  }

  return (
    <>
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
										<a href="javascript:void(0);">Account Details</a>
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
								<h3>Recent Orders</h3>
								
								<div className="table_outr">
									<div className="input_table">
                    <div className="tbl_row">
											<div className="tbl_cell hdr-tx">
												<div className="cell_input">
													Order
												</div>
											</div>
											<div className="tbl_cell hdr-tx">
												<div className="cell_input">
													Date
												</div>
											</div>
											<div className="tbl_cell hdr-tx">
												<div className="cell_input">
													Status
												</div>
											</div>
											<div className="tbl_cell hdr-tx">
												<div className="cell_input">
													Total
												</div>
											</div>
											
											<div className="tbl_cell ">
											<div className="cell_input">
												&nbsp;
											</div>
										</div>
										</div>
										
										
										
										{orders  && orders.map(order => (
                        <div key={order._id} className="tbl_row">
                          <div className="tbl_cell cell_01">
                            <div className="cell_input">
                              #{order._id}
                            </div>
                          </div>
                          <div className="tbl_cell cell_02">
                            <div className="cell_input">
                              {Moment(order.createdAt).format('MMMM D, YYYY')}
                            </div>
                          </div>
                          <div className="tbl_cell cell_03">
                            <div className="cell_input">
                              {order.orderStatus}
                            </div>
                          </div>
                          <div className="tbl_cell cell_04">
                            <div className="cell_input">
                              <i className="fa fa-eur" aria-hidden="true"></i> {order.totalPrice} for  {order.orderItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} items
                            </div>
                          </div>
                          {/* <div className="tbl_cell cell_05">
                            <div className="cell_input">
                              <Link to={`/order/`+ order._id} className="view-all">VIEW</Link>
                            </div>
                          </div> */}
                        </div>
                    ))}
										
										
                  </div>
                </div>
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

export default MyOrders
