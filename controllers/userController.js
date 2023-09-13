const { User, Thought } = require('../models');

module.exports = {
  // /api/users
  async getUsers(req, res) {
    try {
      const users = await User.find()
      .select('-__v')

      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // /api/users/:userId
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // /api/users
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // /api/users/:userId
async updateUser(req, res) {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
},

  // /api/users/:userId
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'User and associated thoughts deleted!' })
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // /api/users/:userId/friends/
  async addFriend(req, res) {
  try {
    const { userId, friendId } = req.params;

    // Check if the user and friend exist
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!friend) {
      return res.status(404).json({ message: 'Friend not found' });
    }

    // Add the friend to the user's friends list
    user.friends.push(friendId);
    friend.friends.push(userId);
    await user.save();
    await friend.save();

    res.json({ message: 'Friend added successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
},

// /api/users/:userId/friends/:friendId
async removeFriend(req, res) {
  try {
    const { userId, friendId } = req.params;

    // Check if the user and friend exist
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!friend) {
      return res.status(404).json({ message: 'Friend not found' });
    }

    // Remove the friend and the user from each other's friend list
    user.friends = user.friends.filter((friend) => friend.toString() !== friendId);
    await user.save();

    friend.friends = friend.friends.filter((friend) => friend.toString() !== userId);
    await friend.save();

    res.json({ message: 'Friend removed successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
},

};
