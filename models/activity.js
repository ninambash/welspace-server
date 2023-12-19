const mongoose = require('mongoose');
const activitySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    stress_level: { type: String },
    mood: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  });
  
  const Activity = mongoose.model('Activity', activitySchema);
  module.exports = Activity;