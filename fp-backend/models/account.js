import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const Account = new Schema({
  name: String,
  id: String,
  password: String,
  wordbooks: [String],
  created: { type: Date, default: Date.now }
});

// generates hash
Account.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, 8);
};

// compares the password
Account.methods.validateHash = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('account', Account);
