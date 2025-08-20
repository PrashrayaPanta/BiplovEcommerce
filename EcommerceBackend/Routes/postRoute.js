const express = require("express");

const postCtrl = require("../controller/Post.js");

const isAuthenticated = require("../middleware/isAuth");

const postRoute = express.Router();

const multer = require("multer");

const isAdmin = require("../middleware/isAdmin.js");

const { CloudinaryStorage } = require("multer-storage-cloudinary");

// const {
//   deleteOnlyImageHandler,
//   getImageDetailsHandlerForProduct,
//   deleteImageHandlerForProduct,
// } = require("../controller/File.js");

const cloudinary = require("../config/cloudinaryConfig.js");

//!Configure multer storage cloudinary for image

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "nodejspostImages",
    allowedFormat: ["png", "jpeg"],
    public_id: (req, file) => file.fieldname + "_" + Date.now(),
  },
});

///!Configure Multer for uploading image

const upload = multer({
  storage,
  limits: 1024 * 1024 * 5, //5MB LIMIt
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Not an image plz upload an image", false));
    }
  },
});

// Upload a single image for the editor and return its URL
postRoute.post(
  "/admin/post/upload",
  isAuthenticated,
  isAdmin,
  upload.single("image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // multer-storage-cloudinary exposes Cloudinary URL at file.path
    // and the public identifier at file.filename
    return res.status(201).json({
      message: "Image uploaded successfully",
      url: req.file.path,
      public_id: req.file.filename,
    });
  }
);

postRoute.post(
  "/admin/post",
  isAuthenticated,
  isAdmin,
  upload.array("images"),
  postCtrl.createPost
);

postRoute.get("/admin/post", isAuthenticated, isAdmin, postCtrl.getAllPost);

postRoute.get("/post", postCtrl.getAllPost);

// postRoute.get("/post/:id", postCtrl.getPostByID);

// productRoute.delete(
//   "/admin/products/:id/nodejsProductImages/:filename",
//   deleteImageHandlerForProduct
// );

// postRoute.get("/posts/search", postCtrl.searchPost);

// postRoute.get("/posts/Latestposts", postCtrl.Latestposts);

// postRoute.get("/posts/lowtohigh", postCtrl.lowtoHighPricePost);

// postRoute.get("/posts/:id", postCtrl.getCertainpost);

// postRoute.get("/posts", postCtrl.getAllpost);

// productRoute.get("/frontend/latestproducts", )

// postRoute.put(
//   "/admin/posts/:id",
//   isAuthenticated,
//   isAdmin,
//   postCtrl.updateCertainpost
// );

// productRoute.get("/:categoryName", isAuthenticated, isAdmin,  productCtrl.getAllProductsByCategoryName);

// productRoute.get("/latestproduct", isAuthenticated, isAdmin, productCtrl.Latestproducts);

// productRoute.get("/search",  isAuthenticated, isAdmin,  productCtrl.searchproduct);

// postRoute.get(
//   "/admin/posts/:id",
//   isAuthenticated,
//   isAdmin,
//   postCtrl.getCertainpost
// );

// postRoute.get("/admin/posts", isAuthenticated, isAdmin, postCtrl.getAllpost);

// productRoute.get(
//   "/nodejsProductImages/:filename",
//   getImageDetailsHandlerForProduct
// );

// postRoute.delete(
//   "/admin/posts/:id",
//   isAuthenticated,
//   isAdmin,
//   postCtrl.deletepost
// );

// postRoute.get(
//   "/admin/posts/:id/reviews",
//   isAuthenticated,
//   isAdmin,
//   postCtrl.getCertainPostReviews
// );

// productRoute.get("/latestproduct", isAuthenticated,  productCtrl.Latestproducts);

// productRoute.get("/search",  isAuthenticated,  productCtrl.searchproduct);

// postRoute.post(
//   "/posts/:id/reviews",
//   isAuthenticated,
//   postCtrl.createCertainPostReviews
// );

// postRoute.get(
//   "/posts/:id/reviews",
//   isAuthenticated,
//   postCtrl.getCertainPostReviews
// );

// productCtrl.get("/cms/reviews", isAuthenticated, isAdmin, )

//!FrontEnd Part

// productRoute.get("/products", productCtrl.getAllproduct);

// productRoute.get("/sub-categories/:id/products", productCtrl.getAllProductsBySubCategoryId)

// productRoute.get("/products/categories/:id/products", productCtrl.getAllProductByCategoryId)

//! Top Latest Product

// productRoute.get("/frontend/brands/:slug/products", productCtrl.getAllProductByBrandId )

module.exports = postRoute;
