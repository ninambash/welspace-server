const jwt = require('jsonwebtoken');
const db = require('../../models');

const secretKey = process.env.JWT_SECRET;

const authLockedRoute = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.status(401).json({ msg: 'No authentication header found' });
            return;
        }

        // Check if the authorization header has the correct format
        const tokenParts = authHeader.split(' ');

        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
            res.status(401).json({ msg: 'Invalid token format' });
            return;
        }

        const token = tokenParts[1];

        // Verify the token using the secret key
        const decodedToken = jwt.verify(token, secretKey);

        // Find the user based on the decoded user ID
        const foundUser = await db.User.findById(decodedToken._id).exec();

        if (foundUser) {
            res.locals.user = foundUser;
            next();
        } else {
            res.status(401).json({ msg: 'User not found' });
        }
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ msg: 'Authentication failed', error: error.message });
    }
};

module.exports = authLockedRoute;
