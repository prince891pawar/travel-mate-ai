import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check required fields
    if (!name || !email || !password) {
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
      name,
      password: hashedPassword
    });

    // Save user to database
    await newUser.save();

    // Send response
    res.status(201).json({
      message: "user registered successfully",
      user: {
        id: newUser._id,
        username: newUser.name,
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

const loginUser = async (req, res) => {
  try {
      const {email, password} = req.body; 

      if(!email || !password){
        return res.status(400).json({
          message: "please provide all required fields"
        })
      }

      //find user by email
      const user = await User.findOne({email});

      if(!user){
        return res.status(400).json({
          message: "invalid credentials"
        })
      }

      //compare password
      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch){
          return res.status(400).json({
            message: "invalid creadentials"
          })
      }

        // 4. Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // 5. Send response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
      console.error("login error", error)

      res.status(500).json({
        message: "server error"
      })
  }
}

export default {registerUser, loginUser};