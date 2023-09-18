const mongoose = require('mongoose');
const User = require('../model/userSchema');

const addRegisteredUser = async (req, res) => {
    // Destructure the request body, using optional chaining
    const { first_name, last_name, email, pword } = req?.body;

    // Check if all fields are filled
    if (!first_name || !last_name || !email || !pword) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const newUser = await User.create({
            _id: new mongoose.Types.ObjectId(),
            created_at_date: new Date().toDateString(),
            created_at_time: new Date().toTimeString(),
            first_name,
            last_name,
            email,
            pword,
        });
        return res.status(201).json({
            message: `New user ${first_name} is registered.`,
            user: newUser,
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Could not register user.',
            error: error.message,
        });
    }
};

const loginUser = async (req, res) => {
    // Destructure the request body, using optional chaining
    const { email, pword } = req?.body;

    if (!email || !pword) {
        return res.status(401).json({ error: 'Invalid credentials.' });
    }

    try {
        // Find user in database
        const loginInfo = await User.findOne({
            email,
            pword,
        }).exec();

        // If user exists, return user info
        if (loginInfo) {
            return res.status(200).json({
                message: `User ${loginInfo.first_name} logged in.`,
                login: loginInfo,
            });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ error: 'Could not login.', error: error.message });
    }
};

// const logoutUser = async (req, res) => {
// not to sure how to go about this one and implement yet
// };
module.exports = { addRegisteredUser, loginUser };
