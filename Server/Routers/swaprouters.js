const express = require('express');
const router = express.Router();
const swapController = require('../controllers/swapcontroller');
const { checkSession } = require('../services/middleware');

// Create a new swap request
router.post('/', checkSession, swapController.createSwap);

// Get all swaps for a logged-in user (sent and received)
router.get('/my-swaps', checkSession, swapController.getUserSwaps);

// Accept a swap request
router.patch('/:id/accept', checkSession, swapController.acceptSwap);

// Reject a swap request
router.patch('/:id/reject', checkSession, swapController.rejectSwap);

// Cancel a swap request (only by sender)
router.delete('/:id/cancel', checkSession, swapController.cancelSwap);

// Mark a swap as completed
router.patch('/:id/complete', checkSession, swapController.completeSwap);

module.exports = router;