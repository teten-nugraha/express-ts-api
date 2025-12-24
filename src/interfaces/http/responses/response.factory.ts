import { ApiSuccessResponse, ApiErrorResponse } from './api-response';

const meta = () => ({
  timestamp: new Date().toISOString(),
});

export const successResponse = <T>(data: T, message = 'Success'): ApiSuccessResponse<T> => ({
  success: true,
  message,
  data,
  meta: meta(),
});

export const errorResponse = (
  message: string,
  code = 'INTERNAL_ERROR',
  details?: unknown,
): ApiErrorResponse => ({
  success: false,
  message,
  error: {
    code,
    details,
  },
  meta: meta(),
});
