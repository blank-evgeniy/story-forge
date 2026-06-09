import { client } from "../client";
export async function checkHealth() {
  const res = await client<{ ok: true }>(`/health`);

  return res;
}
