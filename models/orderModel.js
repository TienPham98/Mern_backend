const mongoose = require("mongoose"); // Erase if already required
const { number } = require("sharp/lib/is");

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shippingInfo: {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
      ward: {
        type: String,
        required: true,
      },
      paymentMethod: {
        type: String,
        required: true,
      },
    },
    orderStatus: {
      type: String,
      default: "Đã order",
      enum: [
        "Đã order",
        "Đã chuyển khoản",
        "Chờ chuyển khoản",
        "Đang vận chuyển",
        "Đã nhận hàng",
        "Đã hủy",
      ],
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    totalPriceAndShippingFee: {
      type: Number,
      required: true,
    },
    orderby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);
