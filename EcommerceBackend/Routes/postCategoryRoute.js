const express = require("express");

const isAuthenticated = require("../middleware/isAuth.js");

const postCategoryRoute = express.Router();

const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinary = require("cloudinary").v2;

const multer = require("multer");

//! Configure cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//!Configure multer storage cloudinary for image

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "nodejscatgeoryImage",
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

const isAdmin = require("../middleware/isAdmin.js");

const postCategoryCtrl = require("../controller/PostCategory.js");

//! Admin
postCategoryRoute.post(
  "/admin/postCategories",
  isAuthenticated,
  isAdmin,
  // upload.single("image"),
  postCategoryCtrl.createPostCategory
);

// postCategoryRoute.put("/admin/postCategories/:id", isAuthenticated, isAdmin, postCategoryCtrl.edit);

postCategoryRoute.delete(
  "/admin/postCategories/:id",
  isAuthenticated,
  isAdmin,
  postCategoryCtrl.deletePostCategory
);

postCategoryRoute.get(
  "/admin/postCategories",
  isAuthenticated,
  isAdmin,
  postCategoryCtrl.getAllPostCategory
);

// categoryRoute.get("/:id", isAuthenticated,   categoryCtrl.getCertainCategory);

//! Customer part and //!Normal User

postCategoryRoute.get("/categories", postCategoryCtrl.getAllPostCategory);

// postCategoryRoute.get("/categories/:slug",  postCategoryCtrl.get);

// postCategoryRoute.get("/categories/:slug/products", postCategoryCtrl.getAllProductByCategoryId)

// categoryRoute.get("/frontend/categories/:id/posts",   categoryCtrl.getCertainCategoryProducts)

//! Normal Part

// categoryRoute.get("/frontend/categories", categoryCtrl.getAllCategory);

// categoryRoute.get("/frontend/categories/:id",  categoryCtrl.getCertainCategory)

// categoryRoute.get("/frontend/categories/:id/products", categoryCtrl.getCertainCategoryProducts)

// Route to get category ID by name
// categoryRoute.get("/getCategoryId/:categoryName", categoryCtrl.getCategoryId);

// Example route with missing callback function
// categoryRoute.get("/get", isAuthenticated, isAdmin, categoryCtrl.getCategories);

module.exports = postCategoryRoute;
