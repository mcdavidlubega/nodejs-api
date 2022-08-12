import mongoose from 'mongoose';

const questionsSchema = new mongoose.Schema({
    title: { type: String, min: 10 },
    description: { type: String, max: 2000 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    preferedAnswer: String,
    dateCreated: { type: Date, default: Date.now(), immutable: true },
    dateUpdated: { type: Date, default: Date.now() },
});
questionsSchema.index({ title: 'text' });
export default questionsSchema;
