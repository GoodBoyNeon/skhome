import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["production", "development", "test"]),
    GOOGLE_API_KEY: z.string().min(1),
    SUPABASE_API_KEY: z.string().min(1),
    BLOB_READ_WRITE_TOKEN: z.string().min(1),
    SENTRY_AUTH_TOKEN: z.string().min(1),
    DATABASE_URL: z.string().url(),
    DIRECT_URL: z.string().url(),
    ADMIN_USERNAME: z.string().min(1),
    ADMIN_PASSWORD_HASH: z.string().min(1),
    SESSION_SECRET: z.string().min(1),
    EMAIL: z.string().email(),
    ORDER_PLACEMENT_EMAIL_ADDRESS: z.string().email(),
    PLACE_ORDER_AUTH_TOKEN: z.string().min(1),
    APP_PASS: z.string().min(1),
  },
  experimental__runtimeEnv: process.env,
});
