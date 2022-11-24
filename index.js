require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const checkToken = require("./lib/checkToken");
const connection = require("./config/db");
const authHeader = require("./lib/checkHeaders");

connection();

// middlewares

const skipTheCheckingOfOrigin = false;

// const allowedOrigins = [
//   "http://192.168.1.59:3010",
//   "http://192.168.1.97:3010",
//   "http://192.168.1.11:3010",
//   "http://192.168.1.2:3010",
//   "http://localhost:3010",
//   "https://nba-pos.nbadigitalservice.com",
// ];
// app.use(express.json());
// app.use("/api/nba-pos/signin", require("./routes/signin")); // login ไม่เช็ค Origin

// app.use(
//   cors({
//     origin: "http://192.168.1.59:3001",
//   })
// );

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       console.log(origin);
//       // allow requests with no origin (like mobile apps or curl requests)
//       // or allow all origines (skipTheCheckingOfOrigin === true)
//       if (!origin || skipTheCheckingOfOrigin === true)
//         return callback(new Error(msg), true);

//       // -1 means that the user's origin is not in the array allowedOrigins
//       if (allowedOrigins.indexOf(origin) === -1) {
//         var msg =
//           "The CORS policy for this site does not " +
//           "allow access from the specified Origin.";

//         return callback(new Error(msg), false);
//       }
//       // origin is in the array allowedOrigins so authorization is granted
//       return callback(null, true);
//     },
//   })
// );

// LOGIN

app.use("/api/nba-pos/delete_image", require("./routes/deleteImage"));
// routes
app.use("/api/nba-pos/owners", authHeader, require("./routes/owner"));
app.use("/api/nba-pos/branch", authHeader, require("./routes/branch"));
app.use("/api/nba-pos/products", require("./routes/product"));
app.use("/api/nba-pos/products/history", require("./routes/product.history"));
app.use("/api/nba-pos/employee", require("./routes/employee"));
app.use("/api/nba-pos/report", require("./routes/report"));
app.use(
  "/api/nba-pos/report_invoice_full",
  require("./routes/report.invoice.full")
);

const port = process.env.PORT || 9010;
// const server = app.listen(port, console.log(`Listening on port ${port}...`));
app.listen(port, console.log(`Listening on port ${port}...`));
