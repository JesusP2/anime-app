import { z } from 'zod'
import { imagesSchema } from './generic'
import { paginationSchema } from './pagination'

const schema = z.object({
  mal_id: z.number(),
  url: z.string(),
  images: imagesSchema,
  name: z.string(),
  name_kanji: z.string(),
  nicknames: z.array(z.string()),
  favorites: z.number(),
  about: z.string(),
})

export const characterSchema = z.object({
  data: z.array(schema),
  pagination: paginationSchema,
})

export type Character = z.infer<typeof schema>;
