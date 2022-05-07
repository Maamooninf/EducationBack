export class ApiError {
  readonly code: number;
  readonly message: any;
  constructor(code: number, message: any) {
    this.code = code;
    this.message = message;
  }

  static badRequest(msg: any) {
    return new ApiError(400, msg);
  }
  static unAuth(msg: any) {
    return new ApiError(401, msg);
  }
  static Forbidden(msg: any) {
    return new ApiError(403, msg);
  }
  static TransPor(msg: any) {
    return new ApiError(502, msg);
  }

  static internal(msg: any) {
    return new ApiError(500, msg);
  }
}
