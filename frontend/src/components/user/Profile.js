import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../actions/userActions';

function Profile() {
  const alert = useAlert();
  const dispatch = useDispatch();
  
  const {user} = useSelector(state => state.auth)
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
                  <h1>my account</h1> 
                    <ul className="breadcrumb">
                        <li>
                          <Link to="/">Home</Link>
                        </li>
                        <li>my account</li>
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
									<li>
										<a href="javascript:void(0);">Dashboard</a>
									</li>
									<li className="active">
										<a href="javascript:void(0);">Orders</a>
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
							<h3>My Account</h3>
							<p>Hello {user.name} (not admin? <Link to="/" onClick={logoutHandler}> Log out</Link>) From your account dashboard you can view your recent orders </p>
							
						</div>
					</div>
				</div>
			</div>
			</div>
		</section>
		

    </>
  )
}

export default Profile