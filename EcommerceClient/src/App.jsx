import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";

import { CursorifyProvider } from "@cursorify/react";

import Footer from "./components/homeComponents/Footer";
import * as Pages from "./pages";
import { Navbar } from "./components/Navbar";
import { BlueCircleCursor } from "./components/homeComponents/BlueCircleCursor";
import NewArrivals from "./components/homeComponents/NewArrivals";

import CategoriesBySlug from "./pages/CategoriesBySlug";
import { AdminRoute } from "./Routes/AdminRoute";
import PrivateRoute from "./Routes/PrivateRoute";

function App() {
  return (
    <CursorifyProvider opacity={1} cursor={<BlueCircleCursor />}>
      <Router>
        {/* Common Part */}
        <Navbar />
        {/* <Suspense fallback={<div>Loading...</div>}> */}
        <Routes>
          <Route path="/" element={<Pages.Home />} />
          {/* <Route path="/home2" element={<Home2 />} /> */}
          <Route path="/categories" element={<Pages.Customer.Categories />} />
          <Route path="/categories/:slug" element={<CategoriesBySlug />} />
          <Route path="/product/:slug" element={<Pages.ProductDescription />} />
          <Route path="/blogs" element={<Pages.Blog />} />
          <Route path="/blogs/:slug" element={<Pages.BlogDetail />} />
          <Route path="/contact" element={<Pages.Contact />} />
          <Route path="/wishlist" element={<Pages.Wishlist />} />
          <Route path="/login" element={<Pages.Auth.Login />} />
          <Route path="/register" element={<Pages.Auth.Register />} />
          <Route path="/cart" element={<Pages.Customer.Cart />} />
          <Route path="/about-us" element={<Pages.AboutUs />} />
          {/* <Route path="/writeBlog" element={<Pages.Admin.BlogWritingPage />} /> */}

          <Route path="writeBlog">
            <Route
              index
              element={
                <AdminRoute
                  element={
                    <PrivateRoute
                      element={<Pages.Admin.Post.BlogWritingPage />}
                    />
                  }
                />
              }
            />

            {/* <Route
              path="create"
              element={
                <AdminRoute
                  element={
                    <PrivateRoute
                      element={<Pages.Admin.Post.BlogWritingPage />}
                    />
                  }
                />
              }
            /> */}
          </Route>

          {/* <Route
            path="/writeBlog"
            element={
              <AdminRoute
                element={
                  <PrivateRoute
                    element={<Pages.Admin.Post.BlogWritingPage />}
                  />
                }
              />
            }
          /> */}

          <Route
            path="/productEntry"
            element={
              <AdminRoute
                element={
                  <PrivateRoute
                    element={<Pages.Admin.Product.ProductEntryForm />}
                  />
                }
              />
            }
          />

          {/* <Route
            path="/postCategory"
            element={<Pages.Admin.CreatePostCategory />}
          /> */}

          <Route
            path="/productCategory"
            element={<PrivateRoute element={<Outlet />} />}
          >
            <Route index element={<Pages.Admin.CategoryProduct.List />} />
            <Route
              path="create"
              element={<Pages.Admin.CategoryProduct.Create />}
            />
            <Route
              path="edit/:id"
              element={<Pages.Admin.CategoryProduct.Edit />}
            />
          </Route>

          {/* <Route path="/postCategory" element={<Pages.Admin.CategoryPost.List/>} /> */}

          <Route
            path="/postCategory"
            element={<PrivateRoute element={<Outlet />} />}
          >
            <Route index element={<Pages.Admin.CategoryPost.List />} />
            <Route
              path="create"
              element={<Pages.Admin.CategoryPost.Create />}
            />
            <Route
              path="edit/:id"
              element={<Pages.Admin.CategoryPost.Edit />}
            />
          </Route>

          {/* <Route
            path="/productEntry"
            element={<Pages.Admin.ProductEntryForm />}
          /> */}
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
