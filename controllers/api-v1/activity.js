const express = require('express');
const { Activity } = require('../../models');

const router = express.Router();

// Create a wellness activity
router.post('/activities', async (req, res) => {
  try {
    const { title, description, category, stress_level, mood } = req.body;
    const newActivity = await Activity.create({ title, description, category, stress_level, mood });
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all wellness activities
router.get('/activities', async (req, res) => {
  try {
    const allActivities = await Activity.find();
    res.json(allActivities);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific wellness activity
router.get('/activities/:activity_id', async (req, res) => {
  try {
    const activity_id = req.params.activity_id;
    const singleActivity = await Activity.findById(activity_id);
    res.json(singleActivity);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a wellness activity
router.put('/activities/:activity_id', async (req, res) => {
  try {
    const activity_id = req.params.activity_id;
    const updatedActivity = await Activity.findByIdAndUpdate(activity_id, req.body, { new: true });
    res.json(updatedActivity);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a wellness activity
router.delete('/activities/:activity_id', async (req, res) => {
  try {
    const activity_id = req.params.activity_id;
    await Activity.findByIdAndDelete(activity_id);
    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
