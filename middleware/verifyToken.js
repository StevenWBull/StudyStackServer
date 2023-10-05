const jwt = require('jsonwebtoken');

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const SECRET_KEY = process.env.JWT_SECRET_KEY;
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) return res.status(403).send('Access Denied');

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

module.exports = verifyToken;
