import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { CursorifyProvider} from '@cursorify/react';

import Footer from './components/homeComponents/Footer';
import * as Pages from "./pages";
import {Navbar} from "./components/Navbar";
import { BlueCircleCursor } from './components/homeComponents/BlueCircleCursor';
import NewArrivals from './components/homeComponents/NewArrivals';

function App() {
  return (
    <CursorifyProvider opacity={1} cursor={<BlueCircleCursor />} >
      <Router>
        {/* Common Part */}
        <Navbar/>
        {/* <Suspense fallback={<div>Loading...</div>}> */}
        <Routes>
          <Route path="/" element={<Pages.Home />} />
          {/* <Route path="/home2" element={<Home2 />} /> */}
          <Route path="/categories" element={<Pages.Customer.Categories />} />
          <Route path="/product/:slug" element={<Pages.ProductDescription />} />
          <Route path="/blogs" element={<Pages.Blog />} />
          <Route path="/blog/:slug" element={<Pages.BlogDetail />} />
          <Route path="/contact" element={<Pages.Contact />} />
          <Route path="/wishlist" element={<Pages.Wishlist />} />
          <Route path="/login" element={<Pages.Auth.Login />} />
          <Route path="/register" element={<Pages.Auth.Register />} />
          <Route path="/cart" element={<Pages.Customer.Cart />} />
          <Route path="/about-us" element={<Pages.AboutUs />} />
          <Route path="/writeBlog" element={<Pages.Admin.BlogWritingPage />} />
          <Route path="/productEntry" element={<Pages.Admin.ProductEntryForm />} />
        </Routes>
        {/* </Suspense> */}
        {/* <NewArrivals /> */}
        {/* Common Part For all Pages */}
        <Footer />
      </Router>
    </CursorifyProvider>
  );
}

export default App;
