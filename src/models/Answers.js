import mongoose from 'mongoose';
import answersSchema from './schemas/answersSchema';

export default mongoose.model('Answer', answersSchema);
