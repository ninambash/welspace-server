const express = require('express');
const { Reminders } = require('../../models'); 

const router = express.Router();

// Schedule a reminder for a task
router.post('/reminders', async (req, res) => {
  try {
    const { user_id, task_id, reminder_time } = req.body;
    const reminder = await Reminders.create({ user_id, task_id, reminder_time });
    res.status(201).json(reminder);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get reminders for a user
router.get('/reminders/:user_id', async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const reminders = await Reminders.find({ user_id });
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a reminder
router.put('/reminders/:reminder_id', async (req, res) => {
  try {
    const reminder_id = req.params.reminder_id;
    
    // Check if the reminder exists
    const existingReminder = await Reminders.findById(reminder_id);
    if (!existingReminder) {
      return res.status(404).json({ error: 'Reminder not found' });
    }

    // Update the reminder
    const updatedReminder = await Reminders.findByIdAndUpdate(reminder_id, req.body, { new: true });
    res.json(updatedReminder);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a reminder
router.delete('/reminders/:reminder_id', async (req, res) => {
  try {
    const reminder_id = req.params.reminder_id;
    await Reminders.findByIdAndDelete(reminder_id);
    res.json({ message: 'Reminder deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
