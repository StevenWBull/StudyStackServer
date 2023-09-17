const User = require('../model/userSchema');

// Middleware to verify if user can update email and/or password
const verifyUserUpdate = () => {
    return async (req, res, next) => {
        // Get email and from request body
        const userID = req.body.user_id;
        const email = req.body.email;
        const current_password = req.body.pword;

        try {
            // Check users collection for a document
            const existingDoc = await User.findOne({
                _id: userID,
            }).exec();

            // If document exists with an email, cannot update
            if (existingDoc.email === email) {
                return res.status(400).json({
                    error: `Email ${req.body.email} already exists.`,
                });
            }

            // Current_password does not exist in document, cannot update
            if (existingDoc.pword !== current_password) {
                return res.status(400).json({
                    error: `Password ${current_password} is not an existing password.`,
                });
            }
        } catch (error) {
            return res.status(500).json({
                error: 'Cannot update user.',
            });
        }
        next();
    };
};

module.exports = verifyUserUpdate;
