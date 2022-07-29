const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: String,
  description: String,
  tag: [String],
  date: { type: Date, default: Date.now },
  user_id: String,
});

module.exports = mongoose.model('Question', questionSchema);
