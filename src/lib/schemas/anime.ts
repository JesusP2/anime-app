import { z } from 'zod';
import { paginationSchema } from './pagination';
import { apiItemSchema, imagesSchema } from './generic';

export const animeSchema = z.object({
  mal_id: z.number(),
  url: z.string(),
  images: imagesSchema,
  trailer: z
    .object({
      youtube_id: z.string().nullish(),
      url: z.string().nullish(),
      embed_url: z.string().nullish(),
    })
    .nullish(),
  approved: z.boolean(),
  titles: z.array(
    z.object({
      type: z.string(),
      title: z.string(),
    }),
  ),
  type: z.enum(['TV', 'OVA', 'Movie', 'Special', 'ONA', 'Music', 'PV']).nullish(),
  source: z.string().nullish(),
  episodes: z.number().nullish(),
  status: z.string().nullish(),
  airing: z.boolean(),
  aired: z.object({
    from: z.string().nullish(),
    to: z.string().nullish(),
    prop: z.object({
      from: z.object({
        day: z.number().nullish(),
        month: z.number().nullish(),
        year: z.number().nullish(),
      }),
      to: z.object({
        day: z.number().nullish(),
        month: z.number().nullish(),
        year: z.number().nullish(),
      }),
      string: z.string().nullish(),
    }).optional(),
  }),
  duration: z.string().nullish(),
  rating: z.string().nullish(),
  score: z.number().nullish(),
  scored_by: z.number().nullish(),
  rank: z.number().nullish(),
  popularity: z.number().nullish(),
  members: z.number().nullish(),
  favorites: z.number().nullish(),
  synopsis: z.string().nullish(),
  background: z.string().nullish(),
  season: z.string().nullish(),
  year: z.number().nullish(),
  broadcast: z
    .object({
      day: z.string().nullish(),
      time: z.string().nullish(),
      timezone: z.string().nullish(),
      string: z.string().nullish(),
    })
    .nullish(),
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
  }).optional(),
});

export const animePageSchema = z.object({
  data: z.array(animeSchema),
  pagination: paginationSchema,
});

export type Anime = z.infer<typeof animeSchema>;
