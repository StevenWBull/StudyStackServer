const { User } = require('../model/userSchema');

// Middleware to verify if user can update their credentials
const verifyUserPatch = async (req, res, next) => {
    // Check if user exists
    const user = await User.findOne({
        email: req.body.email,
        pword: req.body.pword,
    });

    if (!user) {
        // 404 Not Found
        return res.status(404).json({
            error: 'No user with the given credentials exists.',
        });
    }

    // user data to update
    let filter = {};
    if (req.body.new_first_name) filter.first_name = req.body.new_first_name;
    if (req.body.new_last_name) filter.last_name = req.body.new_last_name;
    if (req.body.new_email) filter.email = req.body.new_email;
    if (req.body.new_pword) filter.pword = req.body.new_pword;

    // Store data in req to allow userController to access
    req.user = user;
    req.filter = filter;
    next();
};

module.exports = verifyUserPatch;
