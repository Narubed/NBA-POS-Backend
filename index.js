require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const auth = require("./lib/checkToken");
const connection = require("./config/db");

connection();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());

app.use(express.json());
app.use("/api/nba-pos/signin", require("./routes/signin")); // login ไม่เช็ค Origin

app.use("/api/nba-pos/delete_image", auth, require("./routes/deleteImage"));
// routes
app.use("/api/nba-pos/owners", auth, require("./routes/owner"));
app.use("/api/nba-pos/branch", auth, require("./routes/branch"));
app.use("/api/nba-pos/products", auth, require("./routes/product"));
app.use(
  "/api/nba-pos/products/history",
  auth,
  require("./routes/product.history")
);
app.use("/api/nba-pos/employee", auth, require("./routes/employee"));
app.use("/api/nba-pos/report", auth, require("./routes/report"));
app.use(
  "/api/nba-pos/report_invoice_full",
  auth,
  require("./routes/report.invoice.full")
);

const port = process.env.PORT || 9010;
// const server = app.listen(port, console.log(`Listening on port ${port}...`));
app.listen(port, console.log(`Listening on port ${port}...`));
