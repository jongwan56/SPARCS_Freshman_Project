import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Word = new Schema({
  word: String,
  meaning: String,
  checks: [{ user_id: String, state: String }],
  created: { type: Date, default: Date.now }
});

export default mongoose.model('word', Word);
