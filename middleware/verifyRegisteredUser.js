const { User } = require('../model/userSchema');

// Middleware to verify if user already exists
const verifyRegisteredUser = () => {
    return async (req, res, next) => {
        // Get email and password from request body
        const email = req.body.email;
        const pword = req.body.pword;

        try {
            // Check users collection for a document
            const existingUser = await User.findOne({ email, pword }).exec();

            // If document exists
            if (existingUser) {
                return res.status(400).json({
                    error: `User is already registered.`,
                });
            }
        } catch (error) {
            return res.status(500).json({
                error: 'Could not register user.',
                error: error.message,
            });
        }
        next();
    };
};

module.exports = verifyRegisteredUser;
