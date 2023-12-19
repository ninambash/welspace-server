const mongoose = require('mongoose');
require('dotenv').config();

const dbName = 'wellnessApp'; // Change this to your desired database name
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://127.0.0.1/${dbName}`;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

// Connection events
db.once('open', () => {
  console.log(`🔗 Connected to MongoDB at ${db.host}:${db.port}`);
});

db.on('error', (err) => {
  console.error(`🔥 MongoDB connection error:\n${err}`);
});

// Exporting models
module.exports = {
  User: require('./User'),
  Profile: require('./Profile'),
  Task: require('./Task'),
  Reminders: require('./reminders'), 
  Goal: require('./Goal'),
  Activity: require('./Activity'),
  Engagement: require('./Engagement'),
  QuantitativGoal: require('./quantitativgoal'), 
  Routine: require('./Routine'),
};
