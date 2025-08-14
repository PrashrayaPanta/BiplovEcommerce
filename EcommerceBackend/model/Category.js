const mongoose = require("mongoose");

const schema = mongoose.Schema;

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique:true

    },

    slug:{
      type: String,
      required: true,
      unique: true,
    },

    count:{
      type:Number,
      default: 0,
    },

    image:{
      type: String,
      required:true
    },


  },

  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
