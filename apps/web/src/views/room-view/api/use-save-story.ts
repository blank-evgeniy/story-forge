import { useMutation } from "@siberiacancode/reactuse";

import type { SaveStoryDTO } from "@/shared/api/requests/types";

import { saveStory } from "@/shared/api/requests/save-story";

export const useSaveStory = () =>
  useMutation((data: SaveStoryDTO) => saveStory(data));
