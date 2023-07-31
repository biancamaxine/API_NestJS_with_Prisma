export class BadRequestError extends Error {} // StatusCode: 400

export class UnauthorizedError extends Error {} // StatusCode: 401

export class NotFoundError extends Error {} // StatusCode: 404

export class ConflictError extends Error {} // StatusCode: 409

export class InternalServerError extends Error {} // StatusCode: 500

export class DataBaseError extends Error {} // External Error
