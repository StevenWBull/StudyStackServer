const { User } = require('../model/userSchema');

// Middleware to verify if user can update email and/or password
const verifyUserUpdate = () => {
    return async (req, res, next) => {
        // Get credientials from request body
        const userID = req.body._id;
        const email = req.body.email;
        const current_password = req.body.pword;
        const new_password = req.body.new_pword;

        try {
            // Check users collection for a document
            const existingDoc = await User.findOne({
                _id: userID,
            }).exec();

            // If document exists with an email
            if (existingDoc.email === email) {
                return res.status(400).json({
                    error: `Email already exists for user.`,
                });
            }

            // Current_password does not exist in document, cannot update
            if (existingDoc.pword !== current_password) {
                return res.status(400).json({
                    error: `Password is not an existing password for user.`,
                });
            }

            // Current_password is same as new_password, cannot update
            if (existingDoc.pword === new_password) {
                return res.status(400).json({
                    error: `New password is the same as current password.`,
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
