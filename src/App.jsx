import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Categories from './pages/Categories';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import AboutUs from './pages/AboutUs';
import MobileFooter from './components/MobileFooter';
import ShadcnHeader from './components/ShadcnHeader';
import MobileHeader from './components/MobileHeader';
import BlogDetail from './pages/BlogDetail';
import ProductDescription from './components/categoryComponents/ProductDescription';


function App() {
  return (
    // <div className='md:mx-24 mx-12'>
    <Router>
      <Header />
       <MobileHeader />
      {/* <ShadcnHeader /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/product/:slug" element={<ProductDescription />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
      <Footer />
      <MobileFooter />
    </Router>
    // {/* </div> */}
  );
}

export default App;
