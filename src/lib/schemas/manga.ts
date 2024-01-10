import { z } from 'zod'
import { paginationSchema } from './pagination'
import { apiItemSchema, imagesSchema } from './generic'

const schema = z.object({
  mal_id: z.number(),
  url: z.string(),
  images: imagesSchema,
  approved: z.boolean(),
  titles: z.array(
    z.object({
      type: z.string(),
      title: z.string(),
    }),
  ),
  type: z.enum(['Manga', 'Novel', 'Light Novel', 'One-shot', 'Doujinshi', 'Manhua', 'Manhwa', 'OEL']).nullable(),
  chapters: z.number().nullable(),
  volumes: z.number().nullable(),
  status: z.enum(['Finished', 'Publishing', 'On Hiatus', 'Discontinued', 'Not yet published']),
  score: z.number().nullable(),
  scored_by: z.number().nullable(),
  members: z.number().nullable(),
  favorites: z.number().nullable(),
  synopsis: z.string().nullable(),
  background: z.string().nullable(),
  authors: z.array(apiItemSchema),
  serializations: z.array(apiItemSchema),
  genres: z.array(apiItemSchema),
  explicit_genres: z.array(apiItemSchema),
  themes: z.array(apiItemSchema),
  demographics: z.array(apiItemSchema),
})

export const mangaSchema = z.object({
  data: z.array(schema),
  pagination: paginationSchema,
})

export type Manga = z.infer<typeof schema>;
