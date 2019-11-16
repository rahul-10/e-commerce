class MyError extends Error {
  constructor(name, statusCode, message) {
    super(message);
    this.message = message;
    this.name = name;
    this.statusCode = statusCode;
  }
}
exports.error = (status = 500, message = 'Internal Server Error') => {
  return new MyError(message, status, message);
};
