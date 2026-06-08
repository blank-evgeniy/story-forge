import { BookOpenIcon } from "lucide-react";

import type { StoryListItemDTO } from "@/shared/api/requests/types";

type StoryCardProps = {
  story: StoryListItemDTO;
  onOpen: (id: number) => void;
};

export function StoryCard({ story, onOpen }: StoryCardProps) {
  const date = new Date(story.createdAt).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <button
      type="button"
      className="bg-card text-card-foreground ring-foreground/5 dark:ring-foreground/10 hover:ring-primary/30 flex w-full cursor-pointer flex-col gap-4 overflow-hidden rounded-4xl py-4 text-left text-sm shadow-md ring-1 transition-shadow select-none"
      onClick={() => onOpen(story.id)}
    >
      <div className="grid auto-rows-min items-start gap-1.5 px-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <BookOpenIcon className="text-primary size-4" />
          {story.ownerName}
        </div>
        <div className="text-muted-foreground text-sm">{date}</div>
      </div>
    </button>
  );
}
