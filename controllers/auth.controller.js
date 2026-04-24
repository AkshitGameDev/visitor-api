const { signupSchema, loginSchema } = require("../validators/auth.validator");
const { registerUser, loginUser } = require("../services/auth.service");

const signup = async (req, res) => {
  try {
    const data = signupSchema.parse(req.body);
    const result = await registerUser(data);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    console.log("SIGNUP ERROR:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Signup failed",
    });
  }
};

const login = async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);
    const result = await loginUser(data);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};

const getMe = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};

module.exports = {
  signup,
  login,
  getMe,
};