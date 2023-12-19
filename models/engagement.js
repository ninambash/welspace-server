const mongoose = require('mongoose');
const engagementSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    activity_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity', required: true },
    engagement_date: { type: Date, default: Date.now },
    duration: { type: Number },
    feedback: { type: String },
  });
  
  const Engagement = mongoose.model('Engagement', engagementSchema);
  module.exports = Engagement;