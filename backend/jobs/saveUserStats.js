const User = require('../models/user');

const saveUserStats = async (req, res) => {
    try {
        const { userId, score, prizes } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.score = score;
        user.prizes = prizes;
        await user.save();

        res.json({ message: 'Stats saved successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error saving user stats', error: err });
    }
};

module.exports = { saveUserStats };
