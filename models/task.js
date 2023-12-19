const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date },
    time: { type: String },
    completed: { type: Boolean, default: false },
  });
  
  const Task = mongoose.model('Task', taskSchema);
  module.exports = Task;