const express = require("express");


const isAuthenticated = require("../middleware/isAuth.js");


const categoryRoute = express.Router();


const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinary = require("cloudinary").v2;


const multer  = require('multer')

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






const categoryCtrl = require("../controller/Category.js");



const productCtrl = require("../controller/Product.js")



const productRoute = require("./productRoute.js");


const isAdmin = require("../middleware/isAdmin.js");




//! Admin
categoryRoute.post("/admin/categories", isAuthenticated, isAdmin, upload.single("image"),  categoryCtrl.createCategory);



categoryRoute.put("/admin/categories/:id", isAuthenticated, isAdmin, categoryCtrl.EditCertainCategory);


categoryRoute.delete("/admin/categories/:id", isAuthenticated, isAdmin, categoryCtrl.deleteCategory);


categoryRoute.get("/admin/categories", isAuthenticated, isAdmin,   categoryCtrl.getAllCategory);






// categoryRoute.get("/:id", isAuthenticated,   categoryCtrl.getCertainCategory);




//! Customer part and //!Normal User


categoryRoute.get("/categories",  categoryCtrl.getAllCategory);



categoryRoute.get("/categories/:slug",  categoryCtrl.getCertainCategory);




productRoute.get("/categories/:slug/products", productCtrl.getAllProductByCategoryId)



// categoryRoute.get("/frontend/categories/:id/posts",   categoryCtrl.getCertainCategoryProducts)



//! Normal Part

// categoryRoute.get("/frontend/categories", categoryCtrl.getAllCategory);


// categoryRoute.get("/frontend/categories/:id",  categoryCtrl.getCertainCategory)



// categoryRoute.get("/frontend/categories/:id/products", categoryCtrl.getCertainCategoryProducts)




// Route to get category ID by name
// categoryRoute.get("/getCategoryId/:categoryName", categoryCtrl.getCategoryId);

// Example route with missing callback function
// categoryRoute.get("/get", isAuthenticated, isAdmin, categoryCtrl.getCategories);

module.exports = categoryRoute;

