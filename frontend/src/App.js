import React, {useEffect, useState} from 'react'; 
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';

import Home from './components/Home';
import BlogList from './components/blog/BlogList';
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


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <ScrollToTop/>
        <Routes>

          <Route path="/" element={<Home />} exact />
          <Route path="/news" element={<BlogList />} exact />  
          <Route path="/post/:slug" element={<BlogDetails />} exact />  
          <Route path="/post/:slug" element={<BlogDetails />} exact />  
          <Route path="/about" element={<About />} exact />
          <Route path="/contact" element={<Contact />} exact />
          <Route path="/target" element={<Target />} exact />
          <Route path="/faq" element={<Faq />} exact />
          <Route path="/support" element={<Support />} exact />
          <Route path="/shop" element={<Shop />} exact />
          <Route path="/category/:catslug" element={<CategoryDetails />} exact />
          <Route path="/product/:slug" element={<ProductDetails />} exact />
          <Route path="/cart" element={<Cart />} exact />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}




export default App;
