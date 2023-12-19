const router = require('express').Router();
const db = require('../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authLockedRoute = require('./authLockedRoute');

// GET /users - test endpoint
router.get('/', (req, res) => {
  res.json({ msg: 'Welcome to the users endpoint' });
});

// POST /users/register - CREATE new user
router.post('/register', async (req, res) => {
  try {
    // Check if user exists already
    const findUser = await db.User.findOne({ email: req.body.email });

    // Don't allow emails to register twice
    if (findUser) return res.status(400).json({ msg: 'Email exists already' });

    // Check if JWT_SECRET is set
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ msg: 'JWT_SECRET is not set' });
    }

    // Hash password
    const password = req.body.password;
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = new db.User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();

    // Create jwt payload
    const payload = {
      name: newUser.name,
      email: newUser.email,
      id: newUser.id,
    };

    // Sign jwt and send back
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ msg: 'Server error during registration' });
  }
});

// POST /users/login -- validate login credentials
router.post('/login', async (req, res) => {
  try {
    const foundUser = await db.User.findOne({ email: req.body.email });

    if (!foundUser) {
      return res.status(400).json({ msg: 'User not found' });
    }

    const matchPasswords = await bcrypt.compare(req.body.password, foundUser.password);

    if (!matchPasswords) {
      return res.status(400).json({ msg: 'Incorrect password' });
    }

    // Check if JWT_SECRET is set
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ msg: 'JWT_SECRET is not set' });
    }

    // Create jwt payload
    const payload = {
      name: foundUser.name,
      email: foundUser.email,
      id: foundUser.id,
    };

    // Sign jwt and send back
	const token = await jwt.sign(payload, process.env.JWT_SECRET)

    res.cookie('jwt', token, {
      httpOnly: true,
      // maxAge: 3600000, // Uncomment this line if you want to set a specific cookie expiration time
    });

    res.json({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ msg: 'Server error during login' });
  }
});

// GET /auth-locked - will redirect if a bad jwt token is found
router.get('/auth-locked', authLockedRoute, (req, res) => {
  // We know that if we made it here, the res.locals contains an authorized user
  console.log('This user has been authorized:', res.locals.user);
  res.json({ msg: 'Welcome to the private route!' });
});

module.exports = router;
