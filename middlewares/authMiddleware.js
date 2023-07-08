const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
    throw new Error("There is no token attached to header");
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.exp < Date.now() / 1000) {
      throw new Error("Token has expired");
    }

    const user = await User.findById(decoded?.id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new Error("Not Authorized, Please Login again");
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const {email} = req.user;
  const adminUser = await User.findOne({email});
  if (adminUser.role !== "admin") {
    throw new Error("You are not an admin");
  } else {
    next();
  }
});
module.exports = {authMiddleware, isAdmin};
