import mongoose from 'mongoose';
import questionsSchema from './schemas/questionsSchema';

export default mongoose.model('Question', questionsSchema);
