import z from "zod";

export const roomConfigSchema = z.object({
  aiComment: z.object({
    enable: z.boolean(),
    mood: z
      .enum(["comedian", "critic", "fan", "philosopher", "teacher"])
      .optional(),
  }),
  blindMode: z.boolean(),
  enableTwists: z.boolean(),
  secondsPerTurn: z.number().min(10).max(120),
});
