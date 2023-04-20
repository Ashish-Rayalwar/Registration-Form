const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const multer = require("multer");
const cors = require("cors");
// app.use(cors({ origin: "http://localhost:3000" }));
const path = require("path");

const { dbConnection } = require("./database/db");
const userSchema = require("./Models/userSchema");
const router = require("./routes/route");

require("dotenv").config();
app.use(multer().any());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.use(express.static(path.join(__dirname, "../build")));

const url = process.env.URL;

const port = process.env.PORT || 5000;

dbConnection(url);

app.listen(port, () => {
  console.log(`server start on port ${port}`);
});

app.get("*", (req, res) => {
  const file = path.join(__dirname, "../build/index.html");
  res.sendFile(file);
});
