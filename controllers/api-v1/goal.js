const express = require('express');
const { Goal } = require('../../models');

const router = express.Router();

// Create a long-term goal
router.post('/goals', async (req, res) => {
  try {
    const { user_id, title, description, deadline } = req.body;
    const goal = await Goal.create({ user_id, title, description, deadline });
    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get long-term goals for a user
router.get('/goals/:user_id', async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const goals = await Goal.find({ user_id });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a long-term goal
router.put('/goals/:goal_id', async (req, res) => {
  try {
    const goal_id = req.params.goal_id;
    const updatedGoal = await Goal.findByIdAndUpdate(goal_id, req.body, { new: true });
    res.json(updatedGoal);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a long-term goal
router.delete('/goals/:goal_id', async (req, res) => {
  try {
    const goal_id = req.params.goal_id;
    await Goal.findByIdAndDelete(goal_id);
    res.json({ message: 'Goal deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
