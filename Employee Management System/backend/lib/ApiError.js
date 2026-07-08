class ApiError extends Error {
  constructor(statusCode, message, extra) {
    super(message);
    this.statusCode = statusCode;
    this.extra = extra;
  }
}

module.exports = ApiError;
