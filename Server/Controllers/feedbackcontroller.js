const Feedback = require('../models/feedbackschema');
const SwapRequest = require('../models/swaprequestschema');

// Create feedback for a completed swap
exports.createFeedback = async (req, res) => {
  try {
    const { swap, toUser, rating, comment } = req.body;

    // Check if all required fields are provided
    if (!swap || !toUser || !rating) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Ensure the swap is completed
    const swapRequest = await SwapRequest.findById(swap);
    if (!swapRequest) {
      return res.status(404).json({ message: 'Swap not found' });
    }

    if (swapRequest.status !== 'completed') {
      return res.status(400).json({ message: 'Feedback can only be submitted after completion.' });
    }

    // Prevent duplicate feedback for same swap by same user
    const existingFeedback = await Feedback.findOne({
      swap,
      fromUser: req.user._id,
    });

    if (existingFeedback) {
      return res.status(409).json({ message: 'You have already submitted feedback for this swap.' });
    }

    const feedback = new Feedback({
      swap,
      fromUser: req.user._id,
      toUser,
      rating,
      comment,
    });

    const saved = await feedback.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Feedback creation error:', error);
    res.status(500).json({ message: 'Error creating feedback', error });
  }
};

// Get feedback for a specific user
exports.getUserFeedback = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const feedbacks = await Feedback.find({ toUser: userId })
      .populate('fromUser', 'name')
      .sort({ createdAt: -1 });

    res.json(feedbacks);
  } catch (error) {
    console.error('Fetch user feedback error:', error);
    res.status(500).json({ message: 'Error fetching feedback', error });
  }
};

// Get all feedbacks (admin purpose)
exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate('fromUser toUser', 'name')
      .sort({ createdAt: -1 });

    res.json(feedbacks);
  } catch (error) {
    console.error('Fetch all feedback error:', error);
    res.status(500).json({ message: 'Error fetching all feedbacks', error });
  }
};