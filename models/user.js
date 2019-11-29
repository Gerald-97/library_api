const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin:{ type:Boolean, required:false},
  created_at: { type: Date, default: Date.now }
});

const user = mongoose.model("User", userSchema);

module.exports = user;
