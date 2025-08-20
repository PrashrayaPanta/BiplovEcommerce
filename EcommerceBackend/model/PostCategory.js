const mongoose = require("mongoose");

const postCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const PostCategory = mongoose.model("PostCategory", postCategorySchema);

module.exports = PostCategory;
