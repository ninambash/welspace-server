const express = require('express');
const { QuantitativeGoal } = require('../../models'); 
const router = express.Router();

// Set or update quantitative goals for a user
router.post('/quantitativegoal', async (req, res) => {
  try {
    const { user_id, sleep_goal, nutrient_goals, community_engagement_goal, physical_activity_preferences, occupation, age } = req.body;
    const quantitativeGoal = await QuantitativeGoal.findOneAndUpdate(
      { user_id },
      { sleep_goal, nutrient_goals, community_engagement_goal, physical_activity_preferences, occupation, age },
      { new: true, upsert: true }
    );
    res.json(quantitativeGoal);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get quantitative goals for a user
router.get('/quantitativegoal/:user_id', async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const quantitativeGoal = await QuantitativeGoal.findOne({ user_id });
    res.json(quantitativeGoal);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
