const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  swap: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SwapRequest'
  },
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  toUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    trim: true
  }
}, { timestamps: true });  

module.exports = mongoose.model('Feedback', feedbackSchema);