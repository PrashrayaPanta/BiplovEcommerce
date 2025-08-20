const mongoose = require("mongoose");

const productCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique:true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductCategory = mongoose.model("productCategory", productCategorySchema);

module.exports = ProductCategory;
