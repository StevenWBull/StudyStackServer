// Middleware to verify is a user already has a given stack inside a category
const verifyNewStacks = async (req, res, next) => {
    const user = req.user;
    const category = req.category;
    const { newStacks } = req?.body;

    try {
        for (s in newStacks) {
            if (
                user.categories
                    .id(category._id)
                    .stacks.some(
                        (stack) =>
                            stack.title.toLowerCase() ===
                            newStacks[s].title.toLowerCase()
                    )
            ) {
                return res.status(400).json({
                    error: `Stack ${newStacks[s].title} already exists for user.`,
                });
            }
        }
    } catch (err) {
        return res.status(500).json({
            message: 'Cannot verify stacks',
            error: err.message,
        });
    }

    next();
};

module.exports = verifyNewStacks;
