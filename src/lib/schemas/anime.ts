import { z } from 'zod';
import { paginationSchema } from './pagination';
import { apiItemSchema, imagesSchema } from './generic';

const schema = z.object({
  mal_id: z.number(),
  url: z.string(),
  images: imagesSchema,
  trailer: z
    .object({
      youtube_id: z.string().nullable(),
      url: z.string().nullable(),
      embed_url: z.string().nullable(),
    })
    .nullable(),
  approved: z.boolean(),
  titles: z.array(
    z.object({
      type: z.string(),
      title: z.string(),
    }),
  ),
  type: z.enum(['TV', 'OVA', 'Movie', 'Special', 'ONA', 'Music']).nullable(),
  source: z.string().nullable(),
  episodes: z.number().nullable(),
  status: z.string().nullable(),
  airing: z.boolean(),
  aired: z.object({
    from: z.string().nullable(),
    to: z.string().nullable(),
    prop: z.object({
      from: z.object({
        day: z.number().nullable(),
        month: z.number().nullable(),
        year: z.number().nullable(),
      }),
      to: z.object({
        day: z.number().nullable(),
        month: z.number().nullable(),
        year: z.number().nullable(),
      }),
      string: z.string().nullable(),
    }),
  }),
  duration: z.string().nullable(),
  rating: z.string().nullable(),
  score: z.number().nullable(),
  scored_by: z.number().nullable(),
  rank: z.number().nullable(),
  popularity: z.number().nullable(),
  members: z.number().nullable(),
  favorites: z.number().nullable(),
  synopsis: z.string().nullable(),
  background: z.string().nullable(),
  season: z.string().nullable(),
  year: z.number().nullable(),
  broadcast: z
    .object({
      day: z.string().nullable(),
      time: z.string().nullable(),
      timezone: z.string().nullable(),
      string: z.string().nullable(),
    })
    .nullable(),
  producers: z.array(apiItemSchema),
  licensors: z.array(apiItemSchema),
  studios: z.array(apiItemSchema),
  genres: z.array(apiItemSchema),
  explicit_genres: z.array(apiItemSchema),
  themes: z.array(apiItemSchema),
  demographics: z.array(apiItemSchema),
  theme: z.object({
    openings: z.array(z.string()),
    endings: z.array(z.string()),
  }),
});

export const animeSchema = z.object({
  data: z.array(schema),
  pagination: paginationSchema,
});

export type Anime = z.infer<typeof schema>;
