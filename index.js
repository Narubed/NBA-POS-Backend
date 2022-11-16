require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const checkToken = require("./lib/checkToken");
const connection = require("./config/db");
connection();

// middlewares
app.use(express.json());
app.use(cors());

// LOGIN
app.use("/api/nba-pos/signin", require("./routes/signin"));
app.use("/api/nba-pos/delete_image", require("./routes/deleteImage"));
// routes
app.use("/api/nba-pos/owners", require("./routes/owner"));
app.use("/api/nba-pos/branch", require("./routes/branch"));
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
