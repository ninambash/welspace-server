const express = require('express');
const { QuantitativGoal } = require('../../models');  // Adjust the path based on your project structure
const router = express.Router();

// Set or update quantitative goals for a user
router.post('/quantitativgoal', async (req, res) => {
  try {
    const { user_id, sleep_goal, nutrient_goals, community_engagement_goal, physical_activity_preferences, occupation, age } = req.body;
    const quantitativGoal = await QuantitativGoal.findOneAndUpdate(
      { user_id },
      { sleep_goal, nutrient_goals, community_engagement_goal, physical_activity_preferences, occupation, age },
      { new: true, upsert: true }
    );
    res.json(quantitativGoal);
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get quantitative goals for a user
router.get('/quantitativgoal/:user_id', async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const quantitativGoal = await QuantitativGoal.findOne({ user_id });
    res.json(quantitativGoal);
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
