const { User } = require('../model/userSchema');

// Middleware to verify if user can update their credentials
const verifyUserPatch = async (req, res, next) => {
    const { email, pword, 
        new_first_name, new_last_name, 
        new_email, new_pword} = req?.body;

    // Check if user exists
    const user = await User.findOne({
        email: email,
        pword: pword,
    });

    if (!user) {
        // 404 Not Found
        return res.status(404).json({
            error: 'No user with the given credentials exists.',
        });
    }

    // User data to update if included
    let filter = {};
    if (new_first_name) filter.first_name = new_first_name;
    if (new_last_name) filter.last_name = new_last_name;
    if (new_email) filter.email = new_email;
    if (new_pword) filter.pword = new_pword;

    // Store data in req to allow userController to access
    req.user = user;
    req.filter = filter;
    next();
};

module.exports = verifyUserPatch;
