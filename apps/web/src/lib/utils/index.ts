import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import crypto from 'node:crypto';
import type { UserType } from '../types';

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

export async function getOrCreateUserId(Astro: any): Promise<{
  userId: string;
  userType: UserType;
}> {
  const session = await Astro.locals.auth.validate();
  const userId = session?.user?.id || Astro.cookies.get('guest_id')?.value;
  if (!userId) {
    const newUserId = crypto.randomBytes(32).toString('hex');
    Astro.cookies.set('guest_id', newUserId, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    });
    return {
      userId: newUserId,
      userType: 'guest',
    };
  }
  return {
    userId,
    userType: session?.user ? 'signed-in' : 'guest',
  };
}
