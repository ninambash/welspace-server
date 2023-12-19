const mongoose = require('mongoose');
const contentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String },
    category: { type: String },
    author: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  });
  
  const Content = mongoose.model('Content', contentSchema);
  