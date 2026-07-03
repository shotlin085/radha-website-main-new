import { createTokenHandler } from "@21st-sdk/nextjs/server";
import { getServerEnv } from "@/lib/env";

export const POST = createTokenHandler({
  apiKey: getServerEnv().API_KEY_21ST,
});
