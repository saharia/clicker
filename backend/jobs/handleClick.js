const User = require('../models/user');

const handleClick = async (req, res) => {
    try {
        let { username } = req.body;
        let user = await User.findOne({ username });

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        let reward = 0;
        if (Math.random() < 0.5) reward = 10; // 50% chance of 10 points
        if (Math.random() < 0.25) user.prizes += 1; // 25% chance of a prize

        user.score += 1 + reward;
        
        await user.save();

        res.json({ score: user.score, prizes: user.prizes, reward });
    } catch (err) {
        res.status(500).json({ message: 'Error processing click', error: err });
    }
};

module.exports = { handleClick };
