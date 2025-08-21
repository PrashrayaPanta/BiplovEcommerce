const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {

    product:{
        type:String,
        required:true,
        unique:true,
    },

    slogan:{
        type: String,
        required:true,
    },

    logo: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },

    slug:{
      type: String,
      required: true,
    }


  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
