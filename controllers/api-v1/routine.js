const express = require('express');
const { Routine } = require('../../models');

const router = express.Router();

// Create or update user routines
router.post('/routines', async (req, res) => {
  try {
    const { user_id, routine_items } = req.body;
    const routine = await Routine.findOneAndUpdate({ user_id }, { routine_items }, { new: true, upsert: true });
    res.json(routine);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get user routines
router.get('/routines/:user_id', async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const routine = await Routine.findOne({ user_id });
    res.json(routine);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
