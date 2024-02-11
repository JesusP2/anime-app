import { z } from 'zod'

export const apiItemSchema = z.object({
  mal_id: z.number(),
  type: z.string(),
  name: z.string(),
  url: z.string(),
})

export const imagesSchema = z.object({
  jpg: z.object({
    image_url: z.string().nullish(),
    small_image_url: z.string().nullish(),
    large_image_url: z.string().nullish(),
  }),
  webp: z.object({
    image_url: z.string().nullish(),
    small_image_url: z.string().nullish(),
    large_image_url: z.string().nullish(),
  }),
})

