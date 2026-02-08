const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    supplier_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: ["Organic Food", "Handmade", "Sustainable Goods"],
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    stock_quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    unit: {
      type: String,
      required: true,
      default: 'pcs'
    },

    certification_status: {
      type: String,
      enum: ["Certified", "Pending", "Not Certified"],
      default: "Pending",
    },

    certification_expiry_date: {
      type: Date,
    },

    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Product", productSchema);
