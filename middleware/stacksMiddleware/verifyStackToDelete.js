// Middleware to verify if the stack to be deleted exists
const verifyStackToDelete = async (req, res, next) => {
    const category = req.user.categories.id(req.category._id);
    const stackID = req.params.stackID;

    try {
        // If stack ID does not exist, return error
        if (!category.stacks.id(stackID)) {
            return res.status(400).json({
                error: `Stack ${stackID} does not exist for user.`,
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: 'Error when verifying stack.',
            error: err.message,
        });
    }
    next();
};
module.exports = verifyStackToDelete;