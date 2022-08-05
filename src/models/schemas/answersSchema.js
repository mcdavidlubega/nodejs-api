import mongoose from 'mongoose';

const answersSchema = new mongoose.Schema({
    answer: { type: String, min: 3000 },
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    downvotes: [String],
    upvotes: [String],
    dateUpdated: Date,
});

export default answersSchema;
