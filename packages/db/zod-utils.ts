import { z } from "zod";

export const vitalSettingsUpdateSchema = z.object({
  connected: z.boolean().optional(),
  selectedParam: z.string().optional(),
  sleepValue: z.number().optional(),
});

export const productMetadata = z
  .object({
    proPaidForByTeamId: z.number().optional(),
    stripeCustomerId: z.string().optional(),
    vitalSettings: vitalSettingsUpdateSchema.optional(),
    isPremium: z.boolean().optional(),
    sessionTimeout: z.number().optional(), // Minutes
    defaultConferencingApp: z
      .object({
        appSlug: z.string().default("daily-video").optional(),
        appLink: z.string().optional(),
      })
      .optional(),
  })
  .nullable();
