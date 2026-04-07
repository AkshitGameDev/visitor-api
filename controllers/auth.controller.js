const { signupSchema, loginSchema } = require("../validators/auth.validator");
const { registerUser, loginUser } = require("../services/auth.service");

const signup = async (req, res, next) => {
  try {
    const data = signupSchema.parse(req.body);
    const user = await registerUser(data);

    res.status(201).json({
      success: true,
      message: "User created",
      data: user
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);
    const result = await loginUser(data);

    res.json({
      success: true,
      message: "Login successful",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res) => {
  res.json({
    success: true,
    data: req.user
  });
};

module.exports = { signup, login, getMe };