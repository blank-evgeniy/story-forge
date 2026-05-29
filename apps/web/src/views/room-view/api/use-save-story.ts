import { useMutation } from "@siberiacancode/reactuse";

import type { SaveStoryDTO } from "@/api/requests/types";

import { saveStory } from "@/api/requests/save-story";

export const useSaveStory = () =>
  useMutation((data: SaveStoryDTO) => saveStory(data));
