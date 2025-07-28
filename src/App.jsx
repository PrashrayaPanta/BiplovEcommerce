"use client";

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
import MobileFooter from './components/MobileFooter';
import MobileHeader from './components/MobileHeader';
import Home2 from './pages/Home2';
import { CursorifyProvider, DefaultCursor } from '@cursorify/react';
import EmojiCursor from './components/ui/EmojiCursor';
import Header, { Navbar } from './components/Home2/Navbar';
import Footer from './components/Home2/Footer';
import BlueCircleCursor from './components/Home2/BlueCircleCursor';

// Lazy loading pages
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const Categories = lazy(() => import('./pages/Categories'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Cart = lazy(() => import('./pages/Cart'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const BlogWritingPage = lazy(() => import('./pages/BlogWritingPage'));
const ProductEntryForm = lazy(() => import('./pages/ProductEntryForm'));
const ProductDescription = lazy(() => import('./components/categoryComponents/ProductDescription'));


function App() {
  return (
    <CursorifyProvider opacity={1} cursor={<BlueCircleCursor />} >
    <Router>
      {/* <Header />
      <MobileHeader /> */}
      <Navbar/>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/home2" element={<Home />} /> */}
          {/* <Route path="/shop" element={<Shop />} /> */}
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
          <Route path="/writeBlog" element={<BlogWritingPage />} />
          <Route path="/productEntry" element={<ProductEntryForm />} />
        </Routes>
      </Suspense>
      <Footer />
      {/* <MobileFooter /> */}
    </Router>
    </CursorifyProvider>
  );
}

export default App;
