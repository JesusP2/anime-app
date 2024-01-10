import { z } from 'zod'

export const apiItemSchema = z.object({
  mal_id: z.number(),
  type: z.string(),
  name: z.string(),
  url: z.string(),
})

export const imagesSchema = z.object({
  jpg: z.object({
    image_url: z.string().nullable(),
    small_image_url: z.string().nullable(),
    large_image_url: z.string().nullable(),
  }),
  webp: z.object({
    image_url: z.string().nullable(),
    small_image_url: z.string().nullable(),
    large_image_url: z.string().nullable(),
  }),
})

