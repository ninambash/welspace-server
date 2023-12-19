const mongoose = require('mongoose');

const remindersSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  task_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  reminder_time: { type: Date },
  notification_sent: { type: Boolean, default: false },
});

const Reminders = mongoose.model('Reminders', remindersSchema);

module.exports = Reminders;
