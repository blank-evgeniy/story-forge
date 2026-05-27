import type {
  GetStoryResponseDTO,
  StoryListItemDTO,
} from "@/api/requests/types";

import { Card, CardContent } from "@/components/ui/card";

import { StoriesSkeleton } from "./stories-skeleton";
import { StoryCard } from "./story-card";
import { StoryModal } from "./story-modal";

type StoriesViewProps = {
  stories: StoryListItemDTO[] | undefined;
  isLoading: boolean;
  isModalOpen: boolean;
  openedStory: GetStoryResponseDTO | undefined;
  isStoryLoading: boolean;
  onOpen: (id: number) => void;
  onClose: () => void;
};

export function StoriesView({
  stories,
  isLoading,
  isModalOpen,
  openedStory,
  isStoryLoading,
  onOpen,
  onClose,
}: StoriesViewProps) {
  return (
    <div className="flex flex-1 flex-col gap-4 mt-4">
      <h1 className="text-2xl font-bold">Сохранённые истории</h1>

      {isLoading && <StoriesSkeleton />}

      {!isLoading && stories?.length === 0 && (
        <Card size="sm">
          <CardContent className="text-muted-foreground py-8 text-center">
            Историй пока нет
          </CardContent>
        </Card>
      )}

      {!isLoading && stories && stories.length > 0 && (
        <div className="flex flex-col gap-3">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} onOpen={onOpen} />
          ))}
        </div>
      )}

      <StoryModal
        isOpen={isModalOpen}
        openedStory={openedStory}
        isStoryLoading={isStoryLoading}
        onClose={onClose}
      />
    </div>
  );
}
