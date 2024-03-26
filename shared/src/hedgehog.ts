import { z } from "zod";

/**
 * Hedgehog interface shared between server and client
 */

export const hedgehogSchema = z.object({
  id: z.number().optional(), // TODO: loput siilin tietomallista. Zod:lta löytyy esimerkiksi tällaisia tyyppejä: z.enum(), z.string(), z.number() jne. joita voi olla tarpeen hyödyntää
  name: z.string(),
  sex: z.enum(["Male", "Female", "Unknown"]),
  location: {
    x: z.number(),
    y: z.number(),
  }
});

export type Hedgehog = z.infer<typeof hedgehogSchema>;
