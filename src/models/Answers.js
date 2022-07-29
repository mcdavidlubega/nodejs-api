const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  answer: { type: String, min: 5 },
  votes: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  question_id: String,
  user_id: String,
});

module.exports = mongoose.model('Answer', answerSchema);
