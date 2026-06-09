import { useMutation } from "@siberiacancode/reactuse";

import { saveStory } from "@/shared/api/requests/save-story";

export const useSaveStory = (roomCode: string) =>
  useMutation(({ storyId }: { storyId: string }) =>
    saveStory({ roomCode, storyId }),
  );
