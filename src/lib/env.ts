import { z } from "zod";

const serverEnvSchema = z.object({
  API_KEY_21ST: z.string().min(1, "API_KEY_21ST is required in .env.local"),
});

export function getServerEnv() {
  const parsed = serverEnvSchema.safeParse({
    API_KEY_21ST: process.env.API_KEY_21ST,
  });

  if (!parsed.success) {
    throw new Error(
      `Invalid server environment: ${parsed.error.issues.map((i) => i.message).join(", ")}`
    );
  }

  return parsed.data;
}
