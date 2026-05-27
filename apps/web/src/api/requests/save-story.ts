import type { SaveStoryDTO, SaveStoryResponseDTO } from "./types";

import { client } from "../client";

export async function saveStory(body: SaveStoryDTO) {
  return client<SaveStoryResponseDTO>("/stories", {
    method: "POST",
    body,
  });
}
