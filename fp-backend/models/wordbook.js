import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Wordbook = new Schema({
  name: String,
  imgSrc: String,
  description: String,
  chapters: [String],
  totalWords: Number,
  percentage: Number,
  created: { type: Date, default: Date.now }
});

export default mongoose.model('wordbook', Wordbook);
