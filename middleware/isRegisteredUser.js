const { User } = require('../model/userSchema');

// Middleware to verify if user already exists
const isRegisteredUser = async (req, res, next) => {
    try {
         // Check if user exists
        const user = await User.findOne({
            email: req.body.email,
            pword: req.body.pword,
        });
        if (user) {
            // 404 Not Found
            return res.status(404).json({
                error: 'A user with those credentials already exists.',
            });
        }
    } catch (err) {
        return res.status(500).json({
            error: 'Could not register user.',
            error: err.message,
        });
    }
    next(); 
};

module.exports = isRegisteredUser;
