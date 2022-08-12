import mongoose from 'mongoose';

const commentsSchema = new mongoose.Schema({
    answerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Answer' },
    comment: { type: String, max: 1000 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dateUpdated: { type: Date, default: Date.now() },
});

export default commentsSchema;
