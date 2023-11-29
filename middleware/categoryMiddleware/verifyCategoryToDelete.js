// Middleware to verify if the category to be deleted exists
const verifyCategoryToDelete = async (req, res, next) => {
    const user = req.user;
    const categoryID = req.params.categoryID;

    try {
        // If category ID does not exist, return error
        if (!user.categories.id(categoryID)) {
            return res.status(400).json({
                error: `Category ${categoryID} does not exist for user.`,
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: 'Cannot delete category.',
            error: err.message,
        });
    }
    next();
};
module.exports = verifyCategoryToDelete;
