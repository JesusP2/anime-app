import { z } from 'zod';

export const paginationSchema = z.object({
  last_visible_page: z.number(),
  has_next_page: z.boolean(),
  current_page: z.number(),
  items: z.object({
    count: z.number(),
    total: z.number(),
    per_page: z.number(),
  }),
});
