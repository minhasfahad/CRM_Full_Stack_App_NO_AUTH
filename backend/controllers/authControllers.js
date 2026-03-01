import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const SignUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email }); // Fixed: findOne
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const salt = await bcrypt.genSalt(10); // Fixed: Added await
    const hashedPassword = await bcrypt.hash(password, salt); // Fixed: Added await

    const newuser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "Team Member",
    });

    await newuser.save();
    res.status(201).json({ message: "User Registered Successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }); // Fixed: findOne

    if (!user) {
      return res.status(404).json({ message: "User not found. Signup First!" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      result: { id: user._id, name: user.name, role: user.role },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Login error", error: error.message });
  }
};