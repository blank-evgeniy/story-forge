import { Button } from "@/components/ui/button";

import { useStoriesHistory } from "./stories-history-context";

export function StoriesHistoryPicker() {
  const { stories, selectedStory, onSelectStory } = useStoriesHistory();

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-muted-foreground px-0.5 text-xs">
        Хотите вспомнить истории игроков?
      </span>
      <div className="flex [scrollbar-width:none] gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {stories.map((story) => (
          <Button
            key={story.id}
            size="sm"
            variant={selectedStory?.id === story.id ? "default" : "outline"}
            className="shrink-0"
            onClick={() => onSelectStory(story)}
          >
            {story.playerName}
          </Button>
        ))}
      </div>
    </div>
  );
}
