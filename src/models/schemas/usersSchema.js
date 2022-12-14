import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, min: 5, max: 50 },
    email: { type: String, min: 6, max: 50 },
    password: { type: String, min: 6, max: 1024 },
    role: {
        type: String,
        default: 'user',
        enum: ['admin', 'user'],
    },
    dateCreated: { type: Date, default: Date.now, immutable: true },
});

export default userSchema;
