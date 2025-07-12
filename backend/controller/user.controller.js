const User = require("../models/userSchema");

const getUserById = async (req, res) => {
  try {
    const userId = req.userId; 

    const user = await User.findById(userId); 

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getUserById };