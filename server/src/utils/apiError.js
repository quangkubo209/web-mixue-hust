class ApiError extends Error {
    constructor(status, message) {
      super(message);
      this.status = status || 500;
    }
  
    static status(statusCode = 500) {
      this.status = statusCode;
      return this;
    }
    static message(message = "Internal Server Error") {
      this.message = message;
      return this;
    }
  }
  
  module.exports = ApiError;