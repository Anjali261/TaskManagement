import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const usernameRegex = /^[A-Za-z][A-Za-z0-9_]*$/;
    if (!name || !usernameRegex.test(name)) {
      return res.status(400).json({
        message:
          "Username must start with an alphabet and contain only letters, numbers, or underscores",
      });
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    if (!email || !emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Email must be a valid @gmail.com address" });
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!password || !passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters long, include 1 uppercase letter, 1 number, and 1 special character",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User with this Email already Exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashedPassword });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid User data" });
    }
  } catch (error) {
    res.staus(500).json({ error: error.message });
  }
};

export const loginUSer = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please PRovide email and password" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email and PAssword" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.json({
      message: "USer loggedin successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
