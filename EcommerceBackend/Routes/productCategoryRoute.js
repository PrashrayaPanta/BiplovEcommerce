const express = require("express");

const isAuthenticated = require("../middleware/isAuth.js");

const productCategoryRoute = express.Router();


const isAdmin = require("../middleware/isAdmin.js");
const productCategoryCtrl = require("../controller/productCatgeory.js");



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


module.exports = productCategoryRoute;
