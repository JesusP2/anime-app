import { z } from "zod";

const schema = z.object({
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
    })
  ),
  title: z.string(),
  title_english: z.string(),
  title_japanese: z.string(),
  title_synonyms: z.array(z.string()),
  type: z.string(),
  source: z.string(),
  episodes: z.number(),
  status: z.string(),
  airing: z.boolean(),
  aired: z.object({
    from: z.string(),
    to: z.string(),
    prop: z.object({
      from: z.object({
        day: z.number(),
        month: z.number(),
        year: z.number(),
      }),
      to: z.object({
        day: z.number(),
        month: z.number(),
        year: z.number(),
      }),
      string: z.string().optional(),
    }),
  }),
  duration: z.string(),
  rating: z.string(),
  score: z.number(),
  scored_by: z.number(),
  rank: z.number(),
  popularity: z.number(),
  members: z.number(),
  favorites: z.number(),
  synopsis: z.string(),
  background: z.string(),
  season: z.string(),
  year: z.number(),
  broadcast: z.object({
    day: z.string(),
    time: z.string(),
    timezone: z.string(),
    string: z.string(),
  }),
  producers: z.array(
    z.object({
      mal_id: z.number(),
      type: z.string(),
      name: z.string(),
      url: z.string(),
    })
  ),
  licensors: z.array(
    z.object({
      mal_id: z.number(),
      type: z.string(),
      name: z.string(),
      url: z.string(),
    })
  ),
  studios: z.array(
    z.object({
      mal_id: z.number(),
      type: z.string(),
      name: z.string(),
      url: z.string(),
    })
  ),
  genres: z.array(
    z.object({
      mal_id: z.number(),
      type: z.string(),
      name: z.string(),
      url: z.string(),
    })
  ),
  explicit_genres: z.array(
    z.object({
      mal_id: z.number(),
      type: z.string(),
      name: z.string(),
      url: z.string(),
    })
  ),
  themes: z.array(
    z.object({
      mal_id: z.number(),
      type: z.string(),
      name: z.string(),
      url: z.string(),
    })
  ),
  demographics: z.array(
    z.object({
      mal_id: z.number(),
      type: z.string(),
      name: z.string(),
      url: z.string(),
    })
  ),
  theme: z.object({
    openings: z.array(z.string()),
    endings: z.array(z.string()),
  }),
  streaming: z.array(z.object({ name: z.string(), url: z.string() })),
});

export type Anime = z.infer<typeof schema>;
export default schema;