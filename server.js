// require packages
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rowdy = require('rowdy-logger');

// config express app
const app = express();
const PORT = process.env.PORT || 8000;
// for debug logging
const rowdyResults = rowdy.begin(app);
// cross-origin resource sharing
app.use(cors());
// request body parsing
app.use(express.json());

const myMiddleware = (req, res, next) => {
  // I am a middleware
  console.log('Hi 👋 the middleware has been invoked!');
  next(); // makes express move on to the next route/middleware
};

// app.use(myMiddleware)

// GET / -- test index route
// defining a function as route-specific middleware
app.get('/', myMiddleware, (req, res) => {
  res.json({ msg: 'hello backend 🤖' });
});

// controllers and routes
app.use('/api-v1/users', require('./controllers/api-v1/users'));
app.use('/api-v1/profile', require('./controllers/api-v1/profile.js'));
app.use('/api-v1/task', require('./controllers/api-v1/task'));
app.use('/api-v1/reminders', require('./controllers/api-v1/reminder'));

app.use('/api-v1/goal', require('./controllers/api-v1/goal'));
app.use('/api-v1/content', require('./controllers/api-v1/content'));
app.use('/api-v1/activity', require('./controllers/api-v1/activity'));
app.use('/api-v1/engagement', require('./controllers/api-v1/engagement'));
app.use('/api-v1/quantitativgoal', require('./controllers/api-v1/quantitativgoal')); // Updated path

app.use('/api-v1/routine', require('./controllers/api-v1/routine'));

// hey listen on a port
app.listen(PORT, () => {
  rowdyResults.print();
  console.log(`Is that port ${PORT} I hear? 🙉`);
});
