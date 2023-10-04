const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  image: { type: String },
  isAdmin: { type: Boolean },
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
