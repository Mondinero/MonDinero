class ErrorHandler {
  module;
  method;
  log;
  status;
  message;

  constructor(module) {
    this.module = module;
  }

  makeError(method, log, status, message) {
    this.method = method;
    this.log = log;
    this.status = status;
    if (message) {
      this.message = message;
    } else {
      this.message = this.log;
    }

    return { log, status, err: { message } };
  }
}

module.exports = ErrorHandler;
