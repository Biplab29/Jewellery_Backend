const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  cart_id: {
    type: String,
    required: [true, "cart id is required"],
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "user id is required"],
    ref: "User"
  },
  jewellery_ids: {  // ✅ FIXED: changed from "Jewellery_ids"
    type: String,
    required: [true, "product id is required"],
  },
  jewellery_qty: {
    type: String,
    required: [true, "jewellery quantity is required"],
  },
  totalPrice: {
    type: String,
    required: [true, "total price is required"],
  },
  cart_date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Cart", cartSchema);
console.log("Cart has been created successfully.");
