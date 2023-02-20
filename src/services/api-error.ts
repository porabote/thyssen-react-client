function ApiError(api: string) {
  Error.call(this, api) ;
  const name = "PropertyError";

  const property = api;
  const message = "Error in property " + api;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, ApiError);
  } else {
    const stack = (new Error()).stack;
  }

}

ApiError.prototype = Object.create(Error.prototype);

export default ApiError;
