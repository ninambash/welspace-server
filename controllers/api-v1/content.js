const express = require('express');
const { Content } = require('../../models');

const router = express.Router();

// Create an article or video
router.post('/content', async (req, res) => {
  try {
    const { title, content, category, author } = req.body;
    const newContent = await Content.create({ title, content, category, author });
    res.status(201).json(newContent);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all articles and videos
router.get('/content', async (req, res) => {
  try {
    const allContent = await Content.find();
    res.json(allContent);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific article or video
router.get('/content/:content_id', async (req, res) => {
  try {
    const content_id = req.params.content_id;
    const singleContent = await Content.findById(content_id);
    res.json(singleContent);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update an article or video
router.put('/content/:content_id', async (req, res) => {
  try {
    const content_id = req.params.content_id;
    const updatedContent = await Content.findByIdAndUpdate(content_id, req.body, { new: true });
    res.json(updatedContent);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete an article or video
router.delete('/content/:content_id', async (req, res) => {
  try {
    const content_id = req.params.content_id;
    await Content.findByIdAndDelete(content_id);
    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
