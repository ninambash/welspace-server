const express = require('express');
const { Engagement } = require('../../models');

const router = express.Router();

// Record user engagement with an activity
router.post('/engagements', async (req, res) => {
  try {
    const { user_id, activity_id, duration, feedback } = req.body;
    const newEngagement = await Engagement.create({ user_id, activity_id, duration, feedback });
    res.status(201).json(newEngagement);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get user engagements
router.get('/engagements/:user_id', async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const userEngagements = await Engagement.find({ user_id });
    res.json(userEngagements);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
