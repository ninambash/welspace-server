const mongoose = require('mongoose');
const quantitativGoalSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sleep_goal: { type: Number },
    nutrient_goals: [{ type: String }],
    community_engagement_goal: { type: Number },
    physical_activity_preferences: [{ type: String }],
    occupation: { type: String },
    age: { type: Number },
  });
  
  const QuantitativGoal = mongoose.model('QuantitativGoal', quantitativGoalSchema);
  module.exports = QuantitativGoal;