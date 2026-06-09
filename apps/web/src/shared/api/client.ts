import { ofetch } from "ofetch";

import { env } from "@/shared/lib/config/env";

export const client = ofetch.create({
  baseURL: env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
