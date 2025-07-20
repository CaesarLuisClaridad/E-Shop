import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a product name"],
      maxLength: [200, "Product name cannot exceed 200 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please enter a product price"],
      max: [99999, "Product price cannot exceed 5 digits"],
    },
    description: {
      type: String,
      required: [true, "Please enter a product description"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    seller: {
      type: String,
      required: [true, "Please enter a product seller"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter a product stock"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
