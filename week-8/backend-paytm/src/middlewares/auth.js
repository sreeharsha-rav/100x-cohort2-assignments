"use strict";
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { User } = require("../models/User");

// request schemas
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res
        .status(401)
        .json({ success: false, message: "Authorization header is required" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      res
        .status(401)
        .json({ sucess: false, message: "Authorization token is required" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, config.JWT_SECRET);
    } catch (error) {
      console.error("Error verifying token", error);
      throw error;
    }

    // attach the user to the request object
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "Authentication failed", error });
  }
};

module.exports = authMiddleware;
