import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const idxToMonth = [
  'JAN',
  'FEB',
  'MARCH',
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUG',
  'SEPT',
  'OCT',
  'NOV',
  'DEC',
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function json(payload: Record<string, any>, init?: ResponseInit) {
  return new Response(JSON.stringify(payload), {
    ...init,
    headers: { ...init?.headers, 'Content-Type': 'application/json' },
  });
}

export class HttpError extends Error {
  public status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export const entityStatus = [
  'COMPLETED',
  'WATCHING',
  'PLANNING',
  'DROPPED',
  'ON_HOLD',
] as const;
