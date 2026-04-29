import { ofetch } from "ofetch";

export const client = ofetch.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
