const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, min: 5, max: 255 },
  email: { type: String, min: 6, max: 255 },
  password: { type: String, min: 6 },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
