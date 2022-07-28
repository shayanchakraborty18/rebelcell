import React, {useEffect, useState} from 'react'; 
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Home from './components/Home';
import BlogList from './components/blog/BlogList';
import BlogDetails from './components/blog/BlogDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>

          <Route path="/" element={<Home />} exact />
          <Route path="/news" element={<BlogList />} exact />  
          <Route path="/post/:slug" element={<BlogDetails />} exact />  
        
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
