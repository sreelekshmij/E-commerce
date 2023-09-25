const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const updateUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // console.log(user,"user")
    if (!user) {
      res.status(400).json({ message: "Bad request" });
    }
    user.isDeleted = true;
    await user.save();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in deletion" });
  }
};

//GET USERPROFILE
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // console.log(user,"user")
    if (!user) {
      res.status(400).json({ message: "Bad request" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//GET USERS
const getUsers = async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false, isDeleted: false }).sort({_id: -1});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUserCount = async (req,res) => {
  try {
    const user = await User.findById(req.params.id)
    if(!user){
      res.json("badRequest")
    }
    if(user.isAdmin){
      const userCount = await User.countDocuments({isAdmin:false, isDeleted:false})
      // console.log(userCount, "count");
      res.status(200).json(userCount)
    }
  } catch (error) {
    res.status(500).json({message: "invalid request"})
  }
};

//GET USER STATS
// const userStats = async (req, res) => {
//   const date = new Date();
//   const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
//   try {
//     const data = await User.aggregate([
//       { $match: { createdAt: { $gte: lastYear } } },
//       {
//         $project: {
//           month: { $month: "$createdAt" },
//         },
//       },
//       {
//         $group: {
//           _id: "$month",
//           total: { $sum: 1 },
//         },
//       },
//     ]);
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// };

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  getUserCount,
  //   userStats,
};
