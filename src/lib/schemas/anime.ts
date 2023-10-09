import { z } from 'zod';
import { paginationSchema } from './pagination';
import { apiItemSchema, imagesSchema } from './generic';

const schema = z.object({
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
  type: z.string(),
  source: z.string(),
  episodes: z.number().nullish(),
  status: z.string(),
  airing: z.boolean(),
  aired: z
    .object({
      from: z.string().nullish(),
      to: z.string().nullish(),
      prop: z.object({
        from: z
          .object({
            day: z.number().nullish(),
            month: z.number().nullish(),
            year: z.number().nullish(),
          })
          .nullish(),
        to: z
          .object({
            day: z.number().nullish(),
            month: z.number().nullish(),
            year: z.number().nullish(),
          })
          .nullish(),
        string: z.string().optional(),
      }),
    })
    .nullish(),
  duration: z.string(),
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
  producers: z
    .array(apiItemSchema)
    .nullish(),
  licensors: z
    .array(apiItemSchema)
    .nullish(),
  studios: z
    .array(apiItemSchema)
    .nullish(),
  genres: z.array(apiItemSchema),
  explicit_genres: z.array(apiItemSchema),
  themes: z.array(apiItemSchema),
  demographics: z.array(apiItemSchema),
  theme: z
    .object({
      openings: z.array(z.string()),
      endings: z.array(z.string()),
    })
    .nullish(),
  streaming: z.array(z.object({ name: z.string(), url: z.string() })).nullish(),
});

export const animeSchema = z.object({
  data: z.array(schema),
  pagination: paginationSchema,
});

export type Anime = z.infer<typeof schema>;
