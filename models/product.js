const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1500,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    size: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
