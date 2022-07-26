const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const { startServer } = require("./config/startServer");
const ErrorController = require("./controllers/ErrorController");
const indexRoutes = require('./routes')
require("./database/config")();

// IMPORT ROUTES

morgan("dev");

// Log error responses
morgan("combined", {
  skip: function (req, res) {
    return res.statusCode < 400;
  },
});

//connect mongodb

// Init app....
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("combined"));

/** Requiring Routes */
app.use("/api", indexRoutes);
// app.use("/auth", authRoutes);

/**
 * Catch 404 and forward to error handler
 * And
 * Unhandled Errors
 */
app.use(ErrorController.notFound);
app.use(ErrorController.errorHandler);

// start server
startServer(app);
