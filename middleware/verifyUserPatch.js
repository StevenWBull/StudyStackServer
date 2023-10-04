const { User } = require('../model/userSchema');

// Middleware to verify if user can update their credentials
const verifyUserPatch = async (req, res, next) => {
    const { userID } = req?.body;

    // Check if user exists
    const user = await User.findById(userID);

    if (!user) {
        // 404 Not Found
        return res.status(404).json({
            error: 'No user with the given credentials exists.',
        });
    }
    next();
};

module.exports = verifyUserPatch;
