class ErrorController {
  static notFound(req, res, next) {
    let err = new Error("Resource Not Found");
    err.status = 404;
    next(err);
  }

  static errorHandler(error, req, res, next) {
    return res.status(error.status || 500).json({
      error: {
        message: error.message || "Oops! Something went wrong.",
      },
    });
  }
}

module.exports = ErrorController;