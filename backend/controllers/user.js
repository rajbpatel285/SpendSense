const User = require("../models/user-model");

const userdetails = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
  } catch (err) {
    console.error("Error while fetching user details:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getusers = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $project: {
          _id: 1,
          email: 1,
          fullname: { $concat: ["$firstname", " ", "$lastname"] },
        },
      },
    ]);

    return res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const addfriend = async (req, res) => {
  const { userId, friendId } = req.body;
  if (!friendId) {
    return res.status(400).json({ error: "Friend Id is required" });
  }

  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!friend) {
      return res.status(404).json({ error: "Friend not found" });
    }

    // Add the friend to the current user's friends list
    user.friends.push({
      firstname: friend.firstname,
      lastname: friend.lastname,
      email: friend.email,
      id: friend._id,
    });

    // Add the current user to the friend's friends list
    friend.friends.push({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      id: user._id,
    });

    await user.save();
    await friend.save();

    return res.json({ user, friend });
  } catch (error) {
    console.error("Error adding friend:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { userdetails, getusers, addfriend };
