import type { HttpError } from './utils';

export interface ErrorResponse {
  success: false;
  error: HttpError;
}

export interface SuccessResponse<T> {
  success: true;
  data: T;
}
