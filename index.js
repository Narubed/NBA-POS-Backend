require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const connection = require("./config/db");
connection();

// middlewares
app.use(express.json());
app.use(cors());

// LOGIN
app.use("/api/nba-pos/signin", require("./routes/signin"));
// routes
app.use("/api/nba-pos/owners", require("./routes/owner"));
app.use("/api/nba-pos/branch", require("./routes/branch"));
app.use("/api/nba-pos/products", require("./routes/product"));
app.use("/api/nba-pos/employee", require("./routes/employee"));
app.use("/api/nba-pos/report", require("./routes/report"));

const port = process.env.PORT || 9010;
// const server = app.listen(port, console.log(`Listening on port ${port}...`));
app.listen(port, console.log(`Listening on port ${port}...`));
