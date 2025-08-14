const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
    },
    price: {
      type: String,
  
    },

    originalPrice: {
      type: String,
      required:true
    },

    images: [
      {
        url: {
          type: String,
        },
        public_id: {
          type: String,
        },
      },
    ],

    slug: {
      type: String,
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Reference to Category model
      required: true,
    },

    categoryName: {
      type: String,
      required: true,
    },

    reviews: [
      {
        comment: {
          type: String,
        },

        DoneBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Reference to User model
        },

        date: {
          type: Date,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
