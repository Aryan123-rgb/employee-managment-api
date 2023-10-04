const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CartItemSchema = new Schema({
  id: { type: String },
  image: { type: String },
  price: { type: String },
  productName: { type: String },
  qty: { type: Number },
});

const CartSchema = new Schema({
  userEmail: { type: String },
  items: [CartItemSchema],
});

const CartModel = model("Cart", CartSchema);

module.exports = CartModel;
