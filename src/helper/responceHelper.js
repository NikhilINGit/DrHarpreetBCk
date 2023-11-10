const VALIDATION_ERROR_KEY = "Validation Error";
const REQUEST_VALIDATION_ERROR_KEY = "Request Validation error";
const DUPLICATE_ERROR_KEY = "Duplicate Error";
const NOT_FOUND_ERROR_KEY = "Not Found Error";
const NOT_AUTHORIZED_ERROR_KEY = "Not Authorize Error";
const TOO_MANY_REQUESTS_ERROR_KEY = "Too many requests";
const VALIDATION_ERROR = "validationError";

exports.VALIDATION_ERROR_KEY = VALIDATION_ERROR_KEY;
exports.REQUEST_VALIDATION_ERROR_KEY = REQUEST_VALIDATION_ERROR_KEY;
exports.DUPLICATE_ERROR_KEY = DUPLICATE_ERROR_KEY;
exports.NOT_FOUND_ERROR_KEY = NOT_FOUND_ERROR_KEY;
exports.NOT_AUTHORIZED_ERROR_KEY = NOT_AUTHORIZED_ERROR_KEY;
exports.TOO_MANY_REQUESTS_ERROR_KEY = TOO_MANY_REQUESTS_ERROR_KEY;
exports.VALIDATION_ERROR = VALIDATION_ERROR;

exports.userResponse = userResponse;
exports.errorResponse = errorResponse;
exports.negativeResponce = negativeResponce;
const statusCode = 200;
async function userResponse(res, message, data) {
  return res.status(statusCode).send({
    success: true,
    message,
    data,
  });
}
async function negativeResponce(res, message, error) {
    
  return res.status(200).send({
    success: false,
    message,
    error,
  });
}
// function errorResponse(request, response, next) {
function errorResponse(res, message, error){
  return function (error) {
    if (error) {
      var responseMessage = buildErrorResponse(message, error);
      if (message == "VALIDATION_ERROR_KEY") {
        return response.status(400).send(responseMessage);
      } else if (message == NOT_FOUND_ERROR_KEY) {
        return response.status(404).send(responseMessage);
      } else if (message == DUPLICATE_ERROR_KEY) {
        return response.status(409).send(responseMessage);
      } else if (message == NOT_AUTHORIZED_ERROR_KEY) {
        return response.status(403).send(responseMessage);
      } else if (message == REQUEST_VALIDATION_ERROR_KEY) {
        return response.status(422).send(responseMessage);
      } else if (message == TOO_MANY_REQUESTS_ERROR_KEY) {
        return response.status(429).send(responseMessage);
      } else {
        return response.status(400).send(responseMessage);
      }
    }
  };
}

// this function help to genetrate the error  things in the function
function buildErrorResponse(message, error) {
  if (error && error.type) {
    return { message: message, type: error.type };
  }
  return { message: message };
}
