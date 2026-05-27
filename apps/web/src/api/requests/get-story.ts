import type { GetStoryResponseDTO } from "./types";

import { client } from "../client";

export async function getStory(id: number) {
  return client<GetStoryResponseDTO>(`/stories/${id}`);
}
