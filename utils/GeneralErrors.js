import { StatusCodes } from 'http-status-codes';

export default class GeneralErrors extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }

  static Unauthorized(message) {
    return new GeneralErrors(StatusCodes.UNAUTHORIZED, message);
  }

  static BadRequest(message) {
    return new GeneralErrors(StatusCodes.BAD_REQUEST, message);
  }

  static NotFound(message) {
    return new GeneralErrors(StatusCodes.NOT_FOUND, message);
  }

  static Conflict(message) {
    return new GeneralErrors(StatusCodes.CONFLICT, message);
  }

  static Forbidden(message) {
    return new GeneralErrors(StatusCodes.FORBIDDEN, message);
  }
}
