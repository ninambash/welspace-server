const express = require('express');
// const { Profile } = require('../models');
const { Profile } = require('../../models'); 

const router = express.Router();

// Create or update user profile
router.post('/profile', async (req, res) => {
  try {
    const { user_id, age, gender, healthGoals, currentNeeds, sleepWorkBalance, nutritionPreferences, visualPreferences } = req.body;
    const profile = await Profile.findOneAndUpdate(
      { user_id },
      { age, gender, healthGoals, currentNeeds, sleepWorkBalance, nutritionPreferences, visualPreferences },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get user profile
router.get('/profile/:user_id', async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const profile = await Profile.findOne({ user_id });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
