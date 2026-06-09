import type { StoryListItemDTO } from "./types";

import { client } from "../client";

export async function getStories() {
  return client<StoryListItemDTO[]>("/stories");
}
