const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
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
      required: true,
    },

    originalPrice: {
      type: String,
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
      unique: true,
      required: true,
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

    productCategorySlug: {
      type: String,
      required: true,
    },

    reviews: [
      {
        // User Info
        reviewerName: {
          type: String,
        },

        reviewerEmail: {
          type: String,
        },

        reviewerComment: {
          type: String,
        },
      },
    ],

    productDetails: {
      key: {
        type: String,
      },

      value: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
