import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: String,
  username: { type: String, min: 5, max: 50 },
  email: { type: String, min: 6, max: 50 },
  password: { type: String, min: 6, max: 1024 },
  date: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);
