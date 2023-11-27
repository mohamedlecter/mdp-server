const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// In the authenticate middleware
exports.authenticate = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return next(res.status(401).json("Unauthorized"));
    }

    const decodedPayload = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );

    const currentUser = await User.findById(decodedPayload.id);
    if (!currentUser)
      return next(res.status(401).json("User with this token does not exist"));

    // Ensure that req.user includes the 'name' field
    req.user = {
      ...currentUser.toObject(),
      name: currentUser.name,
    };
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json("Unauthorized");
  }
};
