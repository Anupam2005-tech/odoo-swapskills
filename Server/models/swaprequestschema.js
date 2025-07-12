const mongoose = require('mongoose');

const swapRequestSchema = new mongoose.Schema({
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  toUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  skillOffered: {
    type: String,
    required: true,
    trim: true
  },
  skillWanted: {
    type: String,
    required: true,
    trim: true
  },
  message: String,
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default: 'pending'
  }
}, { timestamps: true });  

module.exports = mongoose.model('SwapRequest', swapRequestSchema);