import { z } from 'zod';
import { paginationSchema } from './pagination';

export const schema = z.object({
  mal_id: z.number(),
  url: z.string(),
  images: z.object({
    jpg: z.object({
      image_url: z.string(),
      small_image_url: z.string(),
      large_image_url: z.string(),
    }),
    webp: z.object({
      image_url: z.string(),
      small_image_url: z.string(),
      large_image_url: z.string(),
    }),
  }),
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
  title: z.string(),
  title_english: z.string().nullish(),
  title_japanese: z.string().nullish(),
  title_synonyms: z.array(z.string()),
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
    .array(
      z.object({
        mal_id: z.number().nullish(),
        type: z.string(),
        name: z.string(),
        url: z.string(),
      }),
    )
    .nullish(),
  licensors: z
    .array(
      z.object({
        mal_id: z.number().nullish(),
        type: z.string(),
        name: z.string(),
        url: z.string(),
      }),
    )
    .nullish(),
  studios: z
    .array(
      z.object({
        mal_id: z.number(),
        type: z.string(),
        name: z.string(),
        url: z.string(),
      }),
    )
    .nullish(),
  genres: z.array(
    z.object({
      mal_id: z.number(),
      type: z.string(),
      name: z.string(),
      url: z.string(),
    }),
  ),
  explicit_genres: z.array(
    z.object({
      mal_id: z.number(),
      type: z.string(),
      name: z.string(),
      url: z.string(),
    }),
  ),
  themes: z.array(
    z.object({
      mal_id: z.number(),
      type: z.string(),
      name: z.string(),
      url: z.string(),
    }),
  ),
  demographics: z.array(
    z.object({
      mal_id: z.number(),
      type: z.string(),
      name: z.string(),
      url: z.string(),
    }),
  ),
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
