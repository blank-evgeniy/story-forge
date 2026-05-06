import { Button } from "@/components/ui/button";

import { useStoriesHistory } from "./stories-history-context";

export function StoriesHistoryPicker() {
  const { stories, selectedStory, onSelectStory } = useStoriesHistory();

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs text-muted-foreground px-0.5">
        Хотите вспомнить истории игроков?
      </span>
      <div className="flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {stories.map((story, index) => (
          <Button
            key={index}
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
