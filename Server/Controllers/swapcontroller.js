const SwapRequest = require('../models/swaprequestschema');
const User = require('../models/userSchema');

//  Create new swap request
exports.createSwap = async (req, res) => {
  try {
    const { toUser, skillOffered, skillWanted, message } = req.body;

    if (!toUser || !skillOffered || !skillWanted) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    if (toUser === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot send a swap request to yourself.' });
    }

    // Optional: Validate that toUser exists
    const recipient = await User.findById(toUser);
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient user not found.' });
    }

    const swap = new SwapRequest({
      fromUser: req.user._id,
      toUser,
      skillOffered,
      skillWanted,
      message,
    });

    const savedSwap = await swap.save();
    res.status(201).json(savedSwap);
  } catch (error) {
    console.error('createSwap error:', error);
    res.status(500).json({ message: 'Error creating swap request', error: error.message });
  }
};

// ✅ Get all swap requests related to a user (sent & received)
exports.getUserSwaps = async (req, res) => {
  try {
    const userId = req.user._id;

    const sent = await SwapRequest.find({ fromUser: userId })
      .populate('toUser', 'name')
      .sort({ createdAt: -1 });

    const received = await SwapRequest.find({ toUser: userId })
      .populate('fromUser', 'name')
      .sort({ createdAt: -1 });

    res.json({ sent, received });
  } catch (error) {
    console.error('getUserSwaps error:', error);
    res.status(500).json({ message: 'Error fetching swaps', error: error.message });
  }
};

// ✅ Accept a swap request
exports.acceptSwap = async (req, res) => {
  try {
    const swap = await SwapRequest.findById(req.params.id);

    if (!swap) {
      return res.status(404).json({ message: 'Swap request not found' });
    }

    if (swap.toUser.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to accept this swap' });
    }

    if (swap.status !== 'pending') {
      return res.status(400).json({ message: `Cannot accept a ${swap.status} swap.` });
    }

    swap.status = 'accepted';
    await swap.save();
    res.json(swap);
  } catch (error) {
    console.error('acceptSwap error:', error);
    res.status(500).json({ message: 'Error accepting swap', error: error.message });
  }
};

// ✅ Reject a swap request
exports.rejectSwap = async (req, res) => {
  try {
    const swap = await SwapRequest.findById(req.params.id);

    if (!swap) {
      return res.status(404).json({ message: 'Swap request not found' });
    }

    if (swap.toUser.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to reject this swap' });
    }

    if (swap.status !== 'pending') {
      return res.status(400).json({ message: `Cannot reject a ${swap.status} swap.` });
    }

    swap.status = 'rejected';
    await swap.save();
    res.json(swap);
  } catch (error) {
    console.error('rejectSwap error:', error);
    res.status(500).json({ message: 'Error rejecting swap', error: error.message });
  }
};

// ✅ Cancel a swap request (only sender can cancel if it's still pending)
exports.cancelSwap = async (req, res) => {
  try {
    const swap = await SwapRequest.findById(req.params.id);

    if (!swap) {
      return res.status(404).json({ message: 'Swap request not found' });
    }

    if (swap.fromUser.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only cancel your own swap request' });
    }

    if (swap.status !== 'pending') {
      return res.status(403).json({ message: 'Cannot cancel a swap that is already processed' });
    }

    await swap.deleteOne();
    res.json({ message: 'Swap request canceled' });
  } catch (error) {
    console.error('cancelSwap error:', error);
    res.status(500).json({ message: 'Error canceling swap', error: error.message });
  }
};

// ✅ Mark swap as completed (can be done by either participant)
exports.completeSwap = async (req, res) => {
  try {
    const swap = await SwapRequest.findById(req.params.id);

    if (!swap) {
      return res.status(404).json({ message: 'Swap request not found' });
    }

    if (
      swap.fromUser.toString() !== req.user._id.toString() &&
      swap.toUser.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized to mark this swap as completed' });
    }

    if (swap.status !== 'accepted') {
      return res.status(400).json({ message: 'Only accepted swaps can be marked as completed' });
    }

    swap.status = 'completed';
    await swap.save();
    res.json(swap);
  } catch (error) {
    console.error('completeSwap error:', error);
    res.status(500).json({ message: 'Error completing swap', error: error.message });
  }
};