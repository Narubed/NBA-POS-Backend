require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

module.exports = checkToken = async (req, res, next) => {
  let token = req.headers["auth-token"];
  let ContentType = req.headers["content-type"];

  if (token && ContentType === "application/json") {
    token = token.replace(/^Bearer\s+/, "");
    jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decoded) => {
      if (err) {
        return res.status(408).json({
          success: false,
          message: "Token is not valid หมดเวลาใช้งานแล้ว",
          logout: true,
          description: "Request Timeout",
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Token not provided Token ไม่ถูกต้อง",
      logout: false,
      description: "Unauthorized",
    });
  }
};
