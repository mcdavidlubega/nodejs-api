import mongoose from 'mongoose';

const questionsSchema = new mongoose.Schema({
    title: { type: String, min: 10 },
    description: { type: String, max: 2000 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    preferedAnswer: { type: mongoose.Schema.Types.ObjectId, ref: 'Answer' },
    dateCreated: { type: Date, default: Date.now(), immutable: true },
    dateUpdated: { type: Date, defaault: Date.now() },
});

export default mongoose.model('Question', questionsSchema);
