const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackcontroller');
const { checkSession } = require('../services/middleware');

// Create feedback (must be logged in)
router.post('/', checkSession, feedbackController.createFeedback);

// Get feedback for a specific user
router.get('/:userId', feedbackController.getUserFeedback);

// Admin route to get all feedbacks
router.get('/', checkSession, feedbackController.getAllFeedbacks);

module.exports = router;