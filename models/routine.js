const mongoose = require('mongoose');
const routineSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    routine_items: [{ type: String }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  });
  
  const Routine = mongoose.model('Routine', routineSchema);
  module.exports = Routine;

  
  