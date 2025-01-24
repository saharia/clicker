const User = require('../models/user');
const mongoose = require('mongoose');

const getUserStats = async (req, res) => {
    try {
      let { username } = req.query;
      if(username == null || username == "") {
        return res.status(500).json({ message: 'Enter valid username' });
      }
        let user = await User.findOne({ username });
        
        if (!user) {
          user = new User();
          user.username = username;
          user.save();
          // return res.status(404).json({ message: 'User not found' });
        }

        res.json({ score: user.score, prizes: user.prizes });
    } catch (err) {
      console.log(err);
        res.status(500).json({ message: 'Error fetching user stats', error: err.message || "Something went wrong" });
    }
};

module.exports = { getUserStats };
