require("express-async-errors");
const express = require("express");

const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const { start } = require("repl");

const app = express();

const startServer = async () => {
  try {
    // await
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
