const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//jwt sign token function
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.findAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const token = signToken(user._id);

  try {
    const newUser = await user.save();

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.adminSignup = async (req, res) => {
  const admin = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isAdmin: true,
  });
  //assign token to user
  const token = signToken(admin._id);
  try {
    const newAdmin = await admin.save();
    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newAdmin,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email, password: password });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.password !== password || user.email !== email) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    //assign toke to user
    const token = signToken(user._id);

    res.status(200).json({
      status: "success",
      token,
      data: {
        user: user,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await User.findOne({
      email: email,
      password: password,
      isAdmin: true,
    });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    if (admin.password !== password || admin.email !== email) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    //assign toke to user
    const token = signToken(admin._id);

    res.status(200).json({
      status: "success",
      token,
      data: {
        user: admin,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
