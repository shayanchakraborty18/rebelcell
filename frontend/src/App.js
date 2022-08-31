import React, {useEffect, useState} from 'react'; 
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';

import Home from './components/Home';
import BlogList from './components/blog/BlogList.js';
import BlogDetails from './components/blog/BlogDetails';

import About from './components/cmspages/About';
import Contact from './components/cmspages/Contact';
import Faq from './components/cmspages/Faq';
import Support from './components/cmspages/Support';
import Target from './components/cmspages/Target';

import Shop from './components/product/Shop';
import CategoryDetails from './components/product/CategoryDetails';
import ProductDetails from './components/product/ProductDetails';
import Cart from './components/cart/Cart';
import Search from './components/product/Search';


// auth or user imports
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile'

import Checkout from './components/cart/Checkout';
import OrderSuccess from './components/cart/OrderSuccess';

import { loadUser } from './actions/userActions';
import ProtectedRoute  from './components/route/ProtectedRoute';
import store from './store';
import axios from 'axios';

import { useSelector } from 'react-redux'

// Payment
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import MyOrders  from './components/user/MyOrders';
import OrderDetails from './components/user/OrderDetails';


function App() {

  const [stripeApiKey, setStripeApiKey] = useState('');
  useEffect(() => {
    store.dispatch(loadUser())

    async function getStripApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi')

      setStripeApiKey(data.stripeApiKey);
    }

    getStripApiKey();
  }, [])
  return (
    <Router>
      <div className="App">
        <Header />
        <ScrollToTop/>

          <Route path="/" component={Home} exact />
          <Route path="/news" component={BlogList} exact />  
          <Route path="/post/:slug" component={BlogDetails} exact />    
          <Route path="/about" component={About} exact />
          <Route path="/contact" component={Contact} exact />
          <Route path="/target" component={Target} exact />
          <Route path="/faq" component={Faq} exact />
          <Route path="/support" component={Support} exact />
          <Route path="/shop" component={Shop} exact />
          <Route path="/category/:catslug" component={CategoryDetails} exact />
          <Route path="/product/:slug" component={ProductDetails} exact />
          <Route path="/cart" component={Cart} exact />
          <Route path="/search/:keyword" component={Search} />
          
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute path="/checkout" component={Checkout} />
          </Elements>
          
      
          <ProtectedRoute path="/success" component={OrderSuccess} exact />
          <ProtectedRoute path="/me" component={Profile} exact />
          <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
          <ProtectedRoute path="/myorders" component={MyOrders} exact />
          <ProtectedRoute path="/order/:id" component={OrderDetails} exact />
          
          

          <Route path="/login" component={Login}  exact/>
          <Route path="/register" component={Register} exact/>
           
          {/* <Route path="*" component={Home} exact /> */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
