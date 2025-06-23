const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const upload = require("../middleware/fileUpload");
const authMiddleware = require("../middleware/auth");

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create new user instance
    user = new User({
      name,
      email,
      password,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign JWT token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user and get token
// @access  Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Check if the user is a guide and not verified
    if (user.role === "guide" && !user.isVerified) {
      return res
        .status(403)
        .json({ msg: "Guide not verified. Please contact admin." });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
        role: user.role, // Include the role in the payload
      },
    };

    // Sign JWT token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, role: user.role, user });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST /api/auth/register-guide
// @desc    Register a new guide
// @access  Public
router.post(
  "/register-guide",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "certificate", maxCount: 1 },
  ]),
  async (req, res) => {
    const { name, email, password, location, ratePerHour, availability } =
      req.body;

    try {
      // Check if guide exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "Guide already exists" });
      }

      // Create new guide instance with file paths
      user = new User({
        name,
        email,
        password,
        role: "guide",
        location,
        ratePerHour,
        availability,
        isVerified: false,
        profileImage: req.files["profileImage"][0].path,
        certificate: req.files["certificate"][0].path,
      });

      // Hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save guide to database
      await user.save();

      res.json({
        msg: "Guide registration successful, pending admin verification",
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.post(
  "/register-package",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "certificate", maxCount: 1 },
  ]),
  async (req, res) => {
    const { name, email, password, location } = req.body;

    try {
      // Check if guide exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "Guide already exists" });
      }

      // Create new guide instance with file paths
      user = new User({
        name,
        email,
        password,
        role: "packagemanger",
        location,
        isVerified: false,
        profileImage: req.files["profileImage"][0].path,
        certificate: req.files["certificate"][0].path,
      });

      // Hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save guide to database
      await user.save();

      res.json({
        msg: "Guide registration successful, pending admin verification",
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private Profile
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update Profile Route
router.put("/update-profile", authMiddleware, async (req, res) => {
  try {
    const { name, location, ratePerHour, availability } = req.body;
    const userId = req.user.userId; // Extracted from JWT token

    // Find and update the user profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, location, ratePerHour, availability },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Profile Update Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
