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

// dbConnection
const connectDB = require("./db/mongoose_connection");
const port = process.env.PORT || 3000;

// routers
const authorizationRouter = require("./routes/auth_route");
const propertiesRouter = require("./routes/property_route");

// error handler and other middlewares
const notFoundMiddleware = require("./middleware/not_found_middleware");
const errorHandlerMiddleware = require("./middleware/error_handler_middleware");
const authenticationMiddleware = require("./middleware/authentication");

//security middlewares

app.set("trust proxy", 1); // when behind a reverse proxy
app.use(
  rateLimiter({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(hpp());

// cookie parser
app.use(cookieParser());

// static files
app.use(express.static("./public/uploads"));

// routes
// app.use("/", authenticationMiddleware, (req, res) => {
//   res.send("This is the Asset Bharat Server");
// });

app.use("/api/v1/authorization", authorizationRouter);
app.use("/api/v1/properties", authenticationMiddleware, propertiesRouter); // usage in logic for actions inside Asset Bharat

// error handlers

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// server

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running on port : ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
