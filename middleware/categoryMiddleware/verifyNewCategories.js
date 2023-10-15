// Middleware to verify is a user already has a given category
const verifyNewCategories = async (req, res, next) => {
    const user = req.user;
    const { newCategories } = req?.body;

    try {
        for (c in newCategories) {
            if (
                user.categories.some(
                    (category) =>
                        category.title.toLowerCase() ===
                        newCategories[c].title.toLowerCase()
                )
            ) {
                return res.status(400).json({
                    error: `Category ${newCategories[c].title} already exists for user.`,
                });
            }
        }
    } catch (err) {
        return res.status(500).json({
            message: 'Cannot verify categories',
            error: err.message,
        });
    }
    next();
};

module.exports = verifyNewCategories;
