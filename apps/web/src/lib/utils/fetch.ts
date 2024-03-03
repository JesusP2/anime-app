import type { ErrorResponse, SuccessResponse } from '../types';
import { HttpError } from '.';

export async function apiFetch<T = any>(
  url: string | URL,
  options: RequestInit = {},
): Promise<ErrorResponse | SuccessResponse<T>> {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = await fetch(url, { ...defaultOptions, ...options });
  if (res.ok) {
    return {
      success: true,
      data: (await res.json()) as T,
    };
  }
  res
    .text()
    .then((data) => {
      try {
        console.error(JSON.parse(data));
      } catch (err) {
        console.error(data);
      }
    })
    .catch(console.error);
  return {
    success: false,
    error: new HttpError(res.status, res.statusText),
  };
}
