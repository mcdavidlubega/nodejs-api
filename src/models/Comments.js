import mongoose from 'mongoose';
import commentsSchema from './schemas/commentsSchema';

export default mongoose.model('Comment', commentsSchema);
