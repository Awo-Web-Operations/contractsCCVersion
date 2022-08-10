const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const cookieParser = require("cookie-parser");
const cookieEncrypter = require("cookie-encrypter");
const { startServer } = require("./config/startServer");
const ErrorController = require("./controllers/ErrorController");
const indexRoutes = require("./routes");
const productsRoutes = require("./routes/products");
const storesRoutes = require("./routes/stores");
const { COOKIE_SECRET } = require("./config");

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
app.use(cookieParser(COOKIE_SECRET));
app.use(cookieEncrypter(COOKIE_SECRET));
app.use(morgan("combined"));

/** Requiring Routes */
app.use("/api", indexRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/stores", storesRoutes);

/**
 * Catch 404 and forward to error handler
 * And
 * Unhandled Errors
 */
app.use(ErrorController.notFound);
app.use(ErrorController.errorHandler);

// start server
startServer(app);
