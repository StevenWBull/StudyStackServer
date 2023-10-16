const { Stack } = require('../../model/userSchema');

// Middleware to find and return a stack via its ID
const retrieveStackInfo = async (req, res, next) => {
    const stackID = req.body.stackID;

    if (!stackID) {
        return res.status(400).json({
            error: 'stackID field is required.',
        });
    }
    try {
        // Check if stack exists
        const stack = await Stack.findById(stackID);

        if (!stack) {
            // 404 Not Found
            return res.status(404).json({
                error: 'No stack with the given ID exists.',
            });
        }

        // If user exists store info in the req
        req.stack = stack;
    } catch (err) {
        return res.status(500).json({
            error: err.message,
        });
    }
    next();
};

module.exports = retrieveStackInfo;