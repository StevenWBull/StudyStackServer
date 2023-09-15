const User = require('../model/userSchema');

// Middleware to verify if user already exists
const verifyRegisteredUser = () => {
    return async (req, res, next) => {
        // Get email and password from request body
        const email = req.body.email;
        const pword = req.body.pword;

        // Check users collection for a document
        const existingUser = await User.findOne({ email, pword }).exec();

        // If document exists
        if (existingUser) {
            return res.status(400).json({
                error: `User ${req.body.first_name} is already registered.`,
            });
        }
        next();
    };
};

module.exports = verifyRegisteredUser;
