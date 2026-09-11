import bcrypt from "bcryptjs";
import User from "../models/User.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check required fields
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "please provide all required fields"
      });
    }

    // Password length check
    if (password.length < 6) {
      return res.status(400).json({
        message: "password must be at least 6 characters"
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "user already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      email,
      username,
      password: hashedPassword
    });

    // Save user to database
    await newUser.save();

    // Send response
    res.status(201).json({
      message: "user registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error("Register error:", error);

    res.status(500).json({
      message: "internal server error"
    });
  }
};

export default registerUser;