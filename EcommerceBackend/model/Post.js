const mongoose = require("mongoose");

const schema = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique:true
    },

    postCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PostCategory",
      required: true,
    },

    tags: [String],

    content: {
      type: String,
      required: true,
    },

    slug:{
      type: String,
      unique:true
    }



  },

  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
