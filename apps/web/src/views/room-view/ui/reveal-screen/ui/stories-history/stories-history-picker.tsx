import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui/button";

import { useStoriesHistory } from "./stories-history-context";

export function StoriesHistoryPicker() {
  const { t } = useTranslation();
  const { stories, selectedStory, onSelectStory } = useStoriesHistory();

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-surface-2 text-caption px-0.5">
        {t("reveal.history.remember")}
      </span>
      <div className="flex [scrollbar-width:none] gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {stories.map((story) => (
          <Button
            key={story.id}
            size="sm"
            variant={selectedStory?.id === story.id ? "primary" : "outline"}
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
