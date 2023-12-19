const express = require('express');
const { Task } = require('../../models');


const router = express.Router();

// Create a task
router.post('/tasks', async (req, res) => {
  try {
    const { user_id, title, description, date, time } = req.body;
    const task = await Task.create({ user_id, title, description, date, time });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get tasks for a user
router.get('/tasks/:user_id', async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const tasks = await Task.find({ user_id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a task
router.put('/tasks/:task_id', async (req, res) => {
  try {
    const task_id = req.params.task_id;
    const updatedTask = await Task.findByIdAndUpdate(task_id, req.body, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a task
router.delete('/tasks/:task_id', async (req, res) => {
  try {
    const task_id = req.params.task_id;
    await Task.findByIdAndDelete(task_id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
