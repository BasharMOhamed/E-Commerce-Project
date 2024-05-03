import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

//              CREATE USER
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new Error("Please fill all the inputs.");
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400).send("User already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    createToken(res, newUser._id);
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//              LOGIN
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const isPasswordVaild = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (isPasswordVaild) {
      createToken(res, existingUser._id);
      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
    } else {
      res.status(401);
      throw new Error("Password is wrong");
    }
  } else {
    res.status(404);
    throw new Error("This User not Found");
  }
});

//                LOGOUT
const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200), json({ message: "Logged out Successfully" });
});

//                GET ALL USERS
const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//                GET USER PROFILE
const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.find({ email: req.user.email });
  if (user) {
    res.status(201).json(user);
  } else {
    res.status(404);
    throw new Error("User doesn't exist");
  }
});

//                UPDATE USER PROFILE
const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User doesn't exist");
  }
});

//                DELETE USER
const deleteUser = asyncHandler(async (req, res) => {
  console.log("Delete user function");
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      res.status(404);
      throw new Error("Cannot Delete Admin User");
    }
    await User.deleteOne({ _id: user._id });
    res.json({
      message: "User Deleted Successfully",
    });
  } else {
    res.status(404);
    throw new Error("This User doesn't exist");
  }
});

//             GET SPECIFIC USER BY ID
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("This User cannot be found");
  }
});

//             UPDATE SPECIFIC USER BY ID
const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("This User doesn't exist");
  }
});
export {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUser,
  getUserById,
  updateUserById,
};
