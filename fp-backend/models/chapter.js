import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Chapter = new Schema({
  name: String,
  description: String,
  words: [String],
  created: { type: Date, default: Date.now }
});

export default mongoose.model('chapter', Chapter);
