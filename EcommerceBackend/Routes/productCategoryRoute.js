const express = require("express");

const isAuthenticated = require("../middleware/isAuth.js");

const productCategoryRoute = express.Router();


const isAdmin = require("../middleware/isAdmin.js");
const productCategoryCtrl = require("../controller/productCatgeory.js");
const { getAllProductsCategory } = require("../controller/Product.js");








//! Admin

productCategoryRoute.post(
  "/admin/productCategory",
  isAuthenticated,
  isAdmin,
  productCategoryCtrl.createProductCategory
);



productCategoryRoute.get(
    "/admin/productCategory",
    isAuthenticated,
    isAdmin,
    productCategoryCtrl.getAllProductCategory
  );



  productCategoryRoute.delete(
    "/admin/productCategory/:id",
    isAuthenticated,
    isAdmin,
    productCategoryCtrl.deleteProductCategory
  );

  productCategoryRoute.get("/productCategory", productCategoryCtrl.getAllProductCategory)



  productCategoryRoute.get("/productCategory/:slug", productCategoryCtrl.getAllProductCategoryBySlug)


module.exports = productCategoryRoute;
