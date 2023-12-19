const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    deadline: { type: Date },
    completed_tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  });
  
  const Goal = mongoose.model('Goal', goalSchema);
  module.exports = Goal;