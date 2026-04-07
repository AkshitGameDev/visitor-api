const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const registerUser = async ({ name, userName, email, password }) => {
  const existingUser = await User.findOne({
    $or: [{ email }, { userName }]
  });

  if (existingUser) {
    const error = new Error("User already exists");
    error.statusCode = 409;
    throw error;
  }

  const user = await User.create({
    name,
    userName,
    email,
    password
  });

  return {
    id: user._id,
    name: user.name,
    userName: user.userName,
    email: user.email
  };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      userName: user.userName,
      email: user.email
    }
  };
};

module.exports = { registerUser, loginUser };