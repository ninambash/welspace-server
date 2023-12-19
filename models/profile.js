const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  age: { type: Number },
  gender: { type: String },
  healthGoals: [{ type: String }],
  currentNeeds: [{ type: String }],
  sleepWorkBalance: { type: String },
  nutritionPreferences: { type: String },
  visualPreferences: { type: String },
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
